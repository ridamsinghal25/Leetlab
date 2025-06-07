import axios from "axios";

export const getJudge0Language = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
  };

  return languageMap[language.toUpperCase()];
};

export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript",
    71: "Python",
    62: "Java",
  };
  return LANGUAGE_NAMES[languageId] || "Unknown";
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pollBatchResults = async (tokens) => {
  try {
    while (true) {
      const { data } = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
          headers: {
            Accept: "application/json",
            Authorization: process.env.SULU_SECRET_KEY,
          },
        }
      );

      const results = data.submissions;

      const isAllDone = results.every(
        (result) => result.status.id !== 1 && result.status.id !== 2
      );

      if (isAllDone) {
        return results;
      }
      await sleep(1000);
    }
  } catch (error) {
    console.error("Error polling batch results:", error);
  }
};

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
    {
      submissions,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: process.env.SULU_SECRET_KEY,
      },
    }
  );

  return data;
};

export function formatCodeForPython(language, value) {
  if (language === "PYTHON") {
    if (value === "true") return "True";
    if (value === "false") return "False";
  }
  return value;
}
