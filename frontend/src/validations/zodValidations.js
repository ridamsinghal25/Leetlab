import { DIFFICULTIES_OPTIONS } from "@/constants/constants";
import { z } from "zod";

export const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(DIFFICULTIES_OPTIONS),
  tags: z
    .array(z.string().min(4, "Tag must be at least 4 characters"))
    .min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z
      .string()
      .min(10, "JavaScript code snippet must be at least 10 characters"),
    PYTHON: z
      .string()
      .min(10, "Python code snippet must be at least 10 characters"),
    JAVA: z.string().min(10, "Java solution must be at least 10 characters"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z
      .string()
      .min(10, "JavaScript solution must be at least 10 characters"),
    PYTHON: z
      .string()
      .min(10, "Python solution must be at least 10 characters"),
    JAVA: z.string().min(10, "Java solution must be at least 10 characters"),
  }),
});

export const signUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const playlistSchema = z.object({
  name: z.string().min(3, "Playlist name must be at least 3 characters"),
});
