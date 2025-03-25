const router = require("express").Router();
const Course = require("../models/Course");
const User = require("../models/User");
const Enrollment = require("../models/Enrollment"); // Assuming you have an Enrollment model to track enrollments
const { authMiddleware } = require("../utils/auth");
// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET a single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "No course found with this ID" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// CREATE a new course
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, instructor_id, price, category } = req.body;
    if (!title || !description || !instructor_id || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const course = await Course.create({
      title,
      description,
      instructor_id,
      price: price || 0.00, // Default price to 0.00 if not provided
      category,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE a course by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const courseData = await Course.update(req.body, {
      where: { id: req.params.id },
    });
    if (!courseData[0]) {
      return res.status(404).json({ message: "No course found with this ID" });
    }
    res.status(200).json({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE a course by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "No course found with this ID" });
    }
    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Enroll a user in a course
router.post("/enroll", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    // Check if the user exists
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(401).json({ message: "Token expired" });
    // Check if the course exists
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    // Enroll the user in the course
    await Enrollment.create({
      student_id: req.user.id,
      course_id: courseId,
      enrolled_at: new Date(),
    });
    res.status(200).json({ message: "Successfully enrolled in the course" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;