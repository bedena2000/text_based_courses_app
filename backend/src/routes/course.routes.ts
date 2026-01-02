import { Router } from "express";
import {
  createCourse,
  getInstructorCourses,
  publishCourseContent,
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/**
 * PUBLIC ROUTES
 */

// 1. Get all published courses
router.get("/", getAllCourses);

/**
 * PROTECTED ROUTES (Specific routes MUST come before dynamic ones)
 */

// 2. Get courses for the logged-in instructor
// We move this ABOVE /:courseId so Express doesn't confuse "my-courses" for an ID
router.get("/my-courses", authenticate, getInstructorCourses);

// 3. Create a new course draft
router.post("/", authenticate, createCourse);

/**
 * DYNAMIC ID ROUTES (Place these at the bottom)
 */

// 4. Get a single course by its ID
// This handles http://localhost:4000/api/courses/8
router.get("/:courseId", getCourseById);

// 5. Save/Publish all steps for a specific course
router.post("/:courseId/publish", authenticate, publishCourseContent);

export default router;
