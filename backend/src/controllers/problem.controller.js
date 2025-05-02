import { db } from "../libs/db.js";
import {
  getJudge0Language,
  pollBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not allowed to create a problem",
    });
  }

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0Language(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    //   save the problem to the database

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      sucess: true,
      message: "Message Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({
      error: "Error creating problem",
    });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testcases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    const { id } = req.params;

    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only admin can update problems" });
    }

    const isProblemExists = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!isProblemExists) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0Language(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
        });
      }

      const submissions = testcases.map(({ input, output }) => ({
        stdin: input,
        expected_output: output,
        language_id: languageId,
        source_code: solutionCode,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const updatedProblem = await db.problem.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    if (!updatedProblem) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem: updatedProblem,
    });
  } catch (error) {
    console.error("Error updating problem:", error);
    res.status(500).json({
      error: "Error updating problem",
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();

    if (!problems) {
      return res.status(404).json({
        error: "No problems found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({
      error: "Error fetching problems",
    });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem,
    });
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({
      error: "Error fetching problem",
    });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    await db.problem.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting problem:", error);
    res.status(500).json({
      error: "Error deleting problem",
    });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId,
          },
        },
      },
      include: {
        solvedBy: {
          where: {
            userId,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};
