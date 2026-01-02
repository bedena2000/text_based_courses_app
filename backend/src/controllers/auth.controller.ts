import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

/**
 * REGISTER A NEW USER
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 3 and 30 characters",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Create new user
    const user = await User.create({
      username,
      password_hash: password,
    });

    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          username: user.username,
          created_at: (user as any).created_at,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: error.errors.map((err: any) => err.message).join(", "),
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * LOGIN USER
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify password using the method from User model
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
    });

    res.json({
      success: true,
      message: "Login successfully",
      data: {
        user: {
          id: user.id,
          username: user.username,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * GET CURRENT USER (For Profile page loading)
 */
export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "bio", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * UPDATE USER PROFILE
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { username, bio } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update username if provided and unique logic is handled by Sequelize constraint
    if (username) user.username = username;

    // Bio can be empty string, so check for undefined
    if (bio !== undefined) user.bio = bio;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: user.id,
        username: user.username,
        bio: user.bio,
      },
    });
  } catch (error: any) {
    console.error("Update Profile Error:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "Username is already taken",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
