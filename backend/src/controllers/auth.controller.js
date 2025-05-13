import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import {
  deleteFilesFromImagekit,
  uploadFilesToImagekit,
} from "../libs/imagekit.js";
import { removeUnusedMulterImageFilesOnError } from "../libs/helpers.js";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "User created successfully",
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Error creating user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!isUserExists) {
      return res.status(401).json({
        error: "User does not exists",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: isUserExists.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "User login successfully",
      success: true,
      user: {
        id: isUserExists.id,
        email: isUserExists.email,
        name: isUserExists.name,
        role: isUserExists.role,
        image: isUserExists.image,
      },
    });
  } catch (error) {
    console.error("Error logging user:", error);
    res.status(500).json({
      error: "Error logging user",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(201).json({
      message: "User logout successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({
      error: "Error logging out user",
      success: false,
    });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({
      error: "Error checking user",
      success: false,
    });
  }
};

export const getSubmissionsOfUser = async (req, res) => {
  try {
    const submissions = await db.submission.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({
      error: "Failed to fetch submissions",
      success: false,
    });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const playLists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlists fetched successfully",
      playLists,
    });
  } catch (error) {
    console.error("Fetch Playlists Error:", error);
    res.status(500).json({
      error: "Failed to fetch playlists",
      success: false,
    });
  }
};

export const uploadProfileImage = async (req, res, next) => {
  try {
    const user = req.user;

    const avatarLocalPath = req?.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({
        error: "No file uploaded",
        success: false,
      });
    }

    if (user.image?.fileId && user.image?.url) {
      const deletePreviousFile = await deleteFilesFromImagekit(
        user.image.fileId
      );

      if (!deletePreviousFile) {
        return res.status(500).json({
          error: "Something went wrong. Please try again",
          success: false,
        });
      }
    }

    const avatar = await uploadFilesToImagekit(
      avatarLocalPath,
      req.file.originalname
    );

    if (!avatar) {
      return res.status(500).json({
        error: "Error uploading profile image",
        success: false,
      });
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: {
          fileId: avatar.fileId,
          url: avatar.url,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    if (!updatedUser) {
      return res.status(500).json({
        error: "Error updating user",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);

    removeUnusedMulterImageFilesOnError(req);

    res.status(500).json({
      error: "Error uploading profile image",
      success: false,
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "New password and confirm password do not match",
        success: false,
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Current password is incorrect",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await db.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (!updatedUser) {
      return res.status(500).json({
        error: "Error updating user password",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: {},
    });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({
      error: "Error updating user password",
      success: false,
    });
  }
};
