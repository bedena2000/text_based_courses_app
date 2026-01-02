import { Router } from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * PUBLIC ROUTES
 */

// POST /api/auth/register - Create a new account
router.post("/register", register);

// POST /api/auth/login - Get JWT token
router.post("/login", login);

/**
 * PROTECTED ROUTES
 * Requires "Authorization: Bearer <token>" header
 */

// GET /api/auth/me - Fetch current logged-in user details for the Profile page
router.get("/me", authenticate, getMe);

// PUT /api/auth/update - Update username and bio
router.put("/update", authenticate, updateProfile);

export default router;
