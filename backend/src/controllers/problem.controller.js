import { db } from "../libs/db.js";
import {
  formatCodeForPython,
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
    companies,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippets,
    referenceSolutions,
    stdin,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "You are not allowed to create a problem",
      success: false,
    });
  }

  if (
    !title ||
    !description ||
    !difficulty ||
    !tags ||
    !examples ||
    !constraints ||
    !testcases ||
    !codeSnippets ||
    !referenceSolutions ||
    !stdin
  ) {
    return res.status(400).json({
      error: "All fields are required",
      success: false,
    });
  }

  try {
    for (const [language, referenceCode] of Object.entries(
      referenceSolutions
    )) {
      const languageId = getJudge0Language(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
          success: false,
        });
      }

      const standardInput = stdin[language];

      const solutionCode = referenceCode.concat("\n\n", standardInput);

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: formatCodeForPython(language, input),
        expected_output: formatCodeForPython(language, output),
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
            executionError: {
              stderr: result,
              description: result.status.description,
              expected_output: submissions[i].expected_output,
            },
            success: false,
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
        companies,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolutions,
        stdin,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Problem Created Successfully",
      problem: newProblem,
    });
  } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({
      error: "Error creating problem",
      success: false,
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
      companies,
      examples,
      constraints,
      hints,
      editorial,
      testcases,
      codeSnippets,
      referenceSolutions,
      stdin,
    } = req.body;

    const { id } = req.params;

    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Forbidden: Only admin can update problems" });
    }

    if (
      !title ||
      !description ||
      !difficulty ||
      !tags ||
      !examples ||
      !constraints ||
      !testcases ||
      !codeSnippets ||
      !referenceSolutions ||
      !stdin
    ) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    const isProblemExists = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!isProblemExists) {
      return res.status(404).json({
        error: "Problem not found",
        success: false,
      });
    }

    for (const [language, referenceCode] of Object.entries(
      referenceSolutions
    )) {
      const languageId = getJudge0Language(language);

      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
          success: false,
        });
      }

      const standardInput = stdin[language];

      const solutionCode = referenceCode.concat("\n\n", standardInput);

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: formatCodeForPython(language, input),
        expected_output: formatCodeForPython(language, output),
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
            executionError: {
              stderr: result,
              description: result.status.description,
              expected_output: submissions[i].expected_output,
            },
            success: false,
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
        companies,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippets,
        referenceSolutions,
        stdin,
        userId: req.user.id,
      },
    });

    if (!updatedProblem) {
      return res.status(404).json({
        error: "Problem not found",
        success: false,
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
      success: false,
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const { skip = 1, take = 8 } = req.body;

    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          },
        },
      },
      skip: (skip - 1) * take,
      take,
    });

    if (!problems) {
      return res.status(404).json({
        error: "No problems found",
        success: false,
      });
    }

    if (!req.user.isSubscribed) {
      const updatedProblem = problems.map((problem) => ({
        ...problem,
        companies: [],
      }));

      return res.status(200).json({
        success: true,
        message: "Problems fetched successfully",
        problems: updatedProblem,
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
      success: false,
    });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const problem = await db.problem.findUnique({
      where: {
        id,
      },
      include: {
        likedBy: true,
        savedBy: true,
        markedBy: true,
      },
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
        success: false,
      });
    }

    const likesCount = problem?.likedBy.length;
    const isLikedByUser = problem?.likedBy.some(
      (like) => like.userId === req.user.id
    );

    const isSavedByUser = problem?.savedBy.some(
      (save) => save.userId === req.user.id
    );

    const isMarkedByUser = problem?.markedBy.some(
      (mark) => mark.userId === req.user.id
    );

    const { likedBy, savedBy, markedBy, ...rest } = problem;

    const problemWithLikeStatus = {
      ...rest,
      referenceSolutions: user.isSubscribed ? rest.referenceSolutions : {},
      isLiked: isLikedByUser,
      likesCount,
      isSaved: isSavedByUser,
      isMarked: isMarkedByUser,
    };

    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem: problemWithLikeStatus,
    });
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({
      error: "Error fetching problem",
      success: false,
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
        success: false,
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
      success: false,
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
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        tags: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
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
    res.status(500).json({
      error: "Failed to fetch problems",
      success: false,
    });
  }
};

export const getAllProblemsCount = async (req, res) => {
  try {
    const problemsCount = await db.problem.count();

    return res.status(200).json({
      success: true,
      message: "Problems count fetched successfully",
      problemsCount,
    });
  } catch (error) {
    console.error("Error fetching problems count:", error);
    return res.status(500).json({
      error: "Failed to fetch problems count",
      success: false,
    });
  }
};
