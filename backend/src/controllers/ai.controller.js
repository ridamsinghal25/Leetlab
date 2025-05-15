import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export const generateProblemData = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required." });
    }

    const prompt = `
You will be provided with the title and description of a programming problem. Based on this input, generate a complete JSON object that follows the schema below. All required fields must be included. Return only the final JSON. And I want you to return a JSON response that I can extract using JSON.parse.

✅ INPUT YOU WILL RECEIVE:

title: ${title}
description: ${description}

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).


🔧 FIELDS TO GENERATE:
title: Use the provided title

description: Use the provided description

difficulty: One of "EASY", "MEDIUM", "HARD" (choose based on the nature of the problem)

tags: A relevant array of topic strings (each at least 4 characters)

constraints: Input/output limits written as a string

hints (optional): A tip to help solve the problem

editorial (optional): Concise explanation of the optimal solution

testcases: Array of objects with input and output strings (minimum 1)

examples: An object with 3 keys: JAVASCRIPT, PYTHON, JAVA. Each includes:

input: Example input

output: Expected output

explanation (optional): How the output is calculated

codeSnippets: 3 entries (one for each language) with partial code (min 10 chars)

referenceSolutions: Same languages, with working full solutions

🧾 Example Output Format:
{
  "title": "Example Title",
  "description": "Problem description here...",
  "difficulty": "MEDIUM",
  "tags": ["Array", "Sliding Window"],
  "constraints": "1 <= n <= 10^5",
  "hints": "Use a sliding window approach to track sums.",
  "editorial": "The sliding window technique allows for optimal time complexity...",
  "testcases": [
    { "input": "5\n1 2 3 4 5", "output": "15" }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "arr = [1, 2, 3]",
      "output": "6",
      "explanation": "1 + 2 + 3 = 6"
    },
    "PYTHON": {
      "input": "arr = [1, 2, 3]",
      "output": "6",
      "explanation": "Sum of elements."
    },
    "JAVA": {
      "input": "arr = [1, 2, 3]",
      "output": "6",
      "explanation": "Sum of elements."
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "function sum(arr) { ... }",
    "PYTHON": "def sum(arr): ...",
    "JAVA": "int sum(int[] arr) { ... }"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "function sum(arr) { return arr.reduce((a,b)=>a+b,0); }",
    "PYTHON": "def sum(arr): return sum(arr)",
    "JAVA": "int sum(int[] arr) { int s = 0; for (int x : arr) s += x; return s; }"
  }
}
❗ Return only the valid JSON **without any markdown code blocks** (no backticks). Do not include explanation, headers, or commentary. And I want you to return a JSON response that I can extract using JSON.parse.`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawJson = result.text
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    return res.status(200).json({
      success: true,
      message: "Problem generated successfully",
      data: JSON.parse(rawJson),
    });
  } catch (error) {
    console.error("Error generating problem:", error);
    return res.status(500).json({ error: "Failed to generate problem data." });
  }
};
