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

    const prompt = `You will be provided with the title and description of a programming problem. Based on this input, generate a complete JSON object that follows the schema below. All required fields must be included. Return only the final JSON. And I want you to return a JSON response that I can extract using JSON.parse.

✅ INPUT YOU WILL RECEIVE:

title: ${title}
description: ${description}

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).


🔧 FIELDS TO GENERATE:
title: Use the provided title

description: Use the provided description

difficulty: One of "EASY", "MEDIUM", "HARD" (choose based on the nature of the problem)

tags: A relevant array of topic strings (each at least 4 characters)

companies: A relevant array of company strings (each at least 4 characters)

constraints: Input/output limits written as a string

hints (optional): A tip to help solve the problem

editorial (optional): Concise explanation of the optimal solution

- testcases: An array of at least 1 object with both input and output as **non-empty strings**.

- examples: An object with keys: JAVASCRIPT, PYTHON, and JAVA, each containing:
  - input: Example input string (min length 1)
  - output: Example output string (min length 1)
  - explanation (optional): Add if helpful
input: Example input

output: Expected output

explanation (optional): How the output is calculated

codeSnippets: 3 entries (one for each language) with partial code snippets.

referenceSolutions: Same languages, with working full solutions to the problem.

stdin: 3 entries (one for each language) with standard input for the problem.

🧾 Example Output Format:
{
  "title": "Example Title",
  "description": "Problem description here...",
  "difficulty": "EASY",
  "tags": ["Math", "Conditional"],
  "companies": ["Google", "Amazon"],
  "constraints": "1 <= a, b <= 1000",
  "hints": "Use a simple comparison function.",
  "editorial": "The larger number is simply the maximum of the two values.",
  "testcases": [
    { "input": "10 20", "output": "20" }
  ],
  "examples": {
    "JAVASCRIPT": {
      "input": "10 20",
      "output": "20",
      "explanation": "20 is the greater of the two numbers."
    },
    "PYTHON": {
      "input": "10 20",
      "output": "20"
    },
    "JAVA": {
      "input": "10 20",
      "output": "20"
    }
  },
  "codeSnippets": {
    "JAVASCRIPT": "\\nfunction getGreaterNumber(a, b) {\\n  // code\\n}",
    "PYTHON": "def get_greater_number(a, b):\n    # Return the larger number\n    return 0",
    "JAVA": "public class Main {\n    public static int getGreaterNumber(int a, int b) {\n        // Return the larger number\n        return 0;\n    }"
  },
  "referenceSolutions": {
    "JAVASCRIPT": "\\nfunction getGreaterNumber(a, b) {\\n  // Return the larger number\\n  return Math.max(a, b);\\n}",
    "PYTHON": "def get_greater_number(a, b):\n    # Return the larger number\n    return max(a, b)",
    "JAVA": "public class Main {\n    public static int getGreaterNumber(int a, int b) {\n        // Return the larger number\n        return Math.max(a, b);\n    }"
  },
  "stdin": {
    "JAVASCRIPT": "const readline = require('readline');\\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\n\nrl.on('line', (input) => {\n  \n  const [a, b] = input.split(' ').map(Number);\n  \n  const result = getGreaterNumber(a, b);\n  console.log(result);\n  rl.close();\n});",
    "PYTHON": "import sys\na, b = map(int, sys.stdin.read().split())\nprint(get_greater_number(a, b))",
    "JAVA": "import java.util.Scanner;\n\n\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(getGreaterNumber(a, b));\n    }\n}"
  }
}

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

 Repeat: Only the valid JSON **without any markdown code blocks** (no backticks). Do not include markdown, code fences, comments, explanation, headers, or commentary. And I want you to return a JSON response that I can extract using JSON.parse.
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
      message: "Problem generated successfully",
      data: JSON.parse(rawJson),
    });
  } catch (error) {
    console.error("Error generating problem:", error);
    return res.status(500).json({ error: "Failed to generate problem data." });
  }
};
