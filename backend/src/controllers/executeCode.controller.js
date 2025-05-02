import { db } from "../libs/db.js";
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problemId } =
      req.body;

    const userId = req.user.id;

    // Validate test cases
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({ error: "Invalid or Missing test cases" });
    }

    const isProblemExists = await db.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!isProblemExists) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // 2. Prepare each test cases for judge0 batch submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // 3. Send batch of submissions to judge0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    // 4. Poll judge0 for results of all submitted test cases
    const results = await pollBatchResults(tokens);

    const detailedResults = [];
    let allPassed = true;

    results.forEach((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      detailedResults.push({
        testCase: i + 1,
        passed,
        stdout: result.stdout || null,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      });
    });

    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((res) => res.stdout)),
        stderr: detailedResults.some((res) => res.stderr)
          ? JSON.stringify(detailedResults.map((res) => res.stderr))
          : null,
        compileOutput: detailedResults.some((res) => res.compile_output)
          ? JSON.stringify(detailedResults.map((res) => res.compile_output))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer", // Accepted, wrong
        memory: detailedResults.some((res) => res.memory)
          ? JSON.stringify(detailedResults.map((res) => res.memory))
          : null,
        time: detailedResults.some((res) => res.time)
          ? JSON.stringify(detailedResults.map((res) => res.time))
          : null,
      },
    });

    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    await Promise.all(
      detailedResults.map((result, index) =>
        db.testCaseResult.create({
          data: {
            submissionId: submission.id,
            testCase: index + 1,
            passed: result.passed,
            stdout: result.stdout,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compile_output,
            status: result.status,
            memory: result.memory,
            time: result.time,
          },
        })
      )
    );

    const submissionWithTestCases = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });

    if (!submissionWithTestCases) {
      return res.status(404).json({ error: "Submission not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Code executed successfully",
      submission: submissionWithTestCases,
    });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Failed to execute code" });
  }
};
