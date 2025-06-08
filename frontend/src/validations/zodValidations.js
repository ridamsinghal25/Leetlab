import { DIFFICULTIES_OPTIONS } from "@/constants/constants";
import { z } from "zod";

export const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(DIFFICULTIES_OPTIONS),
  tags: z
    .array(z.string().min(4, "Tag must be at least 4 characters"))
    .min(1, "At least one tag is required"),
  companies: z
    .array(z.string().min(4, "Company must be at least 4 characters"))
    .optional(),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string(),
        output: z.string(),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string(),
      output: z.string(),
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
  stdin: z.object({
    JAVASCRIPT: z
      .string()
      .min(10, "JavaScript standard inputs must be at least 10 characters"),
    PYTHON: z
      .string()
      .min(10, "Python standard inputs must be at least 10 characters"),
    JAVA: z
      .string()
      .min(10, "Java standard inputs must be at least 10 characters"),
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
  description: z
    .string()
    .min(10, "Playlist description must be at least 10 characters"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.newPassword !== data.currentPassword &&
      data.confirmPassword !== data.currentPassword,
    {
      message: "New password cannot be the same as the current password",
      path: ["newPassword"],
    }
  );

export const uploadAvatarSchema = z
  .object({
    image: z.instanceof(File, { message: "Image is required" }),
  })
  .refine(
    (data) =>
      data.image.type === "image/jpeg" || data.image.type === "image/png",
    {
      message: "File must be a JPEG or PNG image.",
      path: ["image"],
    }
  )
  .refine((data) => data.image.size <= 3 * 1024 * 1024, {
    message: "Image size should not exceed 3MB.",
    path: ["image"],
  });

export const aiProblemSchema = z.object({
  title: z.string().min(5, "Problem name must be at least 5 characters"),
  description: z
    .string()
    .min(20, "Problem description must be at least 20 characters"),
});

export const verifyEmailSchema = z.object({
  verifyCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Verification code must contain only digits")
    .length(6, "verification code must be 6 digit"),
});

export const generateQuizSchema = z.object({
  industry: z.string().min(4, "Industry is required"),
  skills: z
    .array(z.string().min(4, "Skill must be at least 4 characters"))
    .min(1, "At least one skill is required"),
});

export const selectPlaylistSchema = z.object({
  playlistId: z.string().min(1, "Playlist is required"),
});
