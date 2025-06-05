import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useQuizStore = create((set, get) => ({
  isFetchingQuizzes: false,
  isSavingQuiz: false,
  isGeneratingQuiz: false,
  quizzes: [],
  quiz: [],

  getQuizAssessments: async () => {
    try {
      set({ isFetchingQuizzes: true });
      const res = await axiosInstance.get("/quiz/get-quiz");

      if (res.data.success) {
        set({ quizzes: res.data.quizzes });

        toast.success(res.data.message || "Quizzes fetched successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting quiz assessments"
      );
    } finally {
      set({ isFetchingQuizzes: false });
    }
  },

  saveQuiz: async (quiz, answers, score) => {
    try {
      set({ isSavingQuiz: true });

      const res = await axiosInstance.post("/quiz/save-quiz", {
        questions: quiz,
        userAnswers: answers,
        score,
      });

      if (res.data.success) {
        if (get().quizzes.length > 0) {
          set({ quizzes: [...get().quizzes, res.data.savedQuiz] });
        }
        set({ quiz: [] });
        toast.success(res.data.message || "Quiz saved successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error saving quiz");
    } finally {
      set({ isSavingQuiz: false });
    }
  },

  generateQuiz: async (data) => {
    try {
      set({ isGeneratingQuiz: true });

      const res = await axiosInstance.post("/quiz/generate-quiz", data);

      if (res.data.success) {
        set({ quiz: res.data.quiz });
        toast.success(res.data.message || "Quiz generated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error generating quiz");
    } finally {
      set({ isGeneratingQuiz: false });
    }
  },
}));
