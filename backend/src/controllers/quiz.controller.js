import { db } from "../libs/db.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export const generateQuiz = async (req, res) => {
  try {
    const { industry, skills } = req.body;

    if (!industry || !skills.length) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    const prompt = `
  Generate 10 **unique and non-repetitive** technical interview questions for a ${industry} professional${
    skills?.length ? ` with expertise in ${skills.join(", ")}` : ""
  }.

  Each question must be multiple choice with exactly 4 options.

  Questions should vary in difficulty and cover different relevant subtopics.

  Return only the following JSON format, with no extra text:
  {
    "questions": [
      {
        "question": "string",
        "options": ["string", "string", "string", "string"],
        "correctAnswer": "string",
        "explanation": "string"
      }
    ]
  }

  Ensure each question is different from the previous ones and not reused across runs.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const matchData = result.text.match(/```json\s*([\s\S]*?)\s*```/i);

    let rawJson;

    if (matchData) {
      rawJson = matchData[1].trim();
    } else {
      rawJson = result.text.trim();
    }

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully",
      quiz: JSON.parse(rawJson).questions,
    });
  } catch (error) {
    console.error("Error generating quiz:", error);
    res.status(500).json({
      error: "Error generating quiz",
      success: false,
    });
  }
};

export const saveQuizResult = async (req, res) => {
  try {
    const { questions, userAnswers, score } = req.body;

    const user = req.user;

    console.log({ questions, userAnswers, score });

    if (
      !questions?.length ||
      !userAnswers?.length ||
      score === null ||
      isNaN(score)
    ) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    const questionResults = questions.map((q, index) => ({
      question: q.question,
      answer: q.correctAnswer,
      userAnswer: userAnswers[index],
      isCorrect: q.correctAnswer === userAnswers[index],
      explanation: q.explanation,
    }));

    const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

    let improvementTip = null;

    if (wrongAnswers.length > 0) {
      const wrongQuestionsText = wrongAnswers
        .map(
          (q) =>
            `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
        )
        .join("\n\n");

      const improvementPrompt = `
      The user got the following question wrong in an technical interview:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

      try {
        const tipResult = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: improvementPrompt,
        });

        improvementTip = tipResult.text.trim();
      } catch (error) {
        console.error("Error generating improvement tip:", error);
      }
    }

    const quizAssessment = await db.quizAssessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        improvementTip,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Quiz result saved successfully",
      savedQuiz: quizAssessment,
    });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    res.status(500).json({
      error: "Error saving quiz result",
      success: false,
    });
  }
};

export const getQuizAssessments = async (req, res) => {
  try {
    const quizzes = await db.quizAssessment.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Quiz assessments fetched successfully",
      quizzes,
    });
  } catch (error) {
    console.error("Error getting quiz assessments:", error);
    res.status(500).json({
      error: "Error getting quiz assessments",
      success: false,
    });
  }
};
