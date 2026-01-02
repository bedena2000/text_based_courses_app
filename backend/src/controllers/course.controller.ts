import { Request, Response } from "express";
import { Course } from "../models/Course";
import { Step } from "../models/Step";
import { User } from "../models/User";

/**
 * GET ALL PUBLISHED COURSES
 */
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({
      // Maps to 'is_published' in DB
      where: { isPublished: true },
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["username", "id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(courses);
  } catch (error: any) {
    console.error("Fetch All Courses Error:", error);
    return res.status(500).json({ message: "Error fetching course list" });
  }
};

/**
 * GET SINGLE COURSE BY ID
 */
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    if (isNaN(Number(courseId))) {
      return res.status(400).json({ message: "Invalid Course ID format" });
    }

    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["username", "id"],
        },
        {
          model: Step,
          as: "steps",
        },
      ],
      // Order steps by the 'order' column ascending
      order: [[{ model: Step, as: "steps" }, "order", "ASC"]],
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error: any) {
    console.error("Get Course By ID Error:", error.message);
    return res.status(500).json({ message: "Error fetching course details" });
  }
};

/**
 * CREATE A NEW COURSE
 */
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, level } = req.body;
    const userId = (req as any).user?.userId;

    if (!title || !level) {
      return res.status(400).json({ message: "Title and Level are required" });
    }

    const newCourse = await Course.create({
      title,
      description,
      level,
      instructorId: userId, // Maps to 'instructor_id'
      isPublished: false, // Maps to 'is_published'
    });

    return res.status(201).json(newCourse);
  } catch (error: any) {
    console.error("Create Course Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating course" });
  }
};

/**
 * GET INSTRUCTOR COURSES
 */
export const getInstructorCourses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    const courses = await Course.findAll({
      where: { instructorId: userId }, // Maps to 'instructor_id'
      include: [{ model: Step, as: "steps", attributes: ["id"] }],
      order: [["createdAt", "DESC"]],
    });

    return res.json(courses);
  } catch (error: any) {
    console.error("Fetch Instructor Courses Error:", error);
    return res.status(500).json({ message: "Error fetching courses" });
  }
};

/**
 * PUBLISH COURSE CONTENT
 */
export const publishCourseContent = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { steps } = req.body;

  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Delete existing steps to perform a clean overwrite
    await Step.destroy({ where: { courseId: Number(courseId) } });

    if (steps && steps.length > 0) {
      const stepsToSave = steps.map((step: any, index: number) => ({
        courseId: Number(courseId), // Maps to 'course_id'
        title: step.title || `Step ${index + 1}`,
        order: index,
        contentBlocks: step.blocks, // Maps to 'content_blocks' (JSON)
      }));

      await Step.bulkCreate(stepsToSave);
    }

    // Update the course status to published
    await course.update({ isPublished: true });

    return res.status(200).json({
      success: true,
      message: "Course published successfully!",
    });
  } catch (error: any) {
    console.error("Publish Content Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while publishing course content",
    });
  }
};
