const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");
const Course = require("../models/Course");
const { authMiddleware } = require("../utils/auth");

// 📌 **Get All Reviews**
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ["name"] }, { model: Course, attributes: ["title"] }],
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
});

// 📌 **Get Reviews for a Specific Course**
router.get("/course/:courseId", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { course_id: req.params.courseId },
      include: [{ model: User, attributes: ["name"] }],
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching course reviews:", err);
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
});

// 📌 **Submit a New Review**
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { course_id, rating, comment } = req.body;
    const student_id = req.user.id;

    if (!course_id || !rating) {
      return res.status(400).json({ message: "Course ID and rating are required" });
    }

    const newReview = await Review.create({
      course_id,
      student_id,
      rating,
      comment,
    });

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ message: "Error submitting review", error: err.message });
  }
});

// 📌 **Delete a Review**
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.destroy();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ message: "Error deleting review", error: err.message });
  }
});

module.exports = router;
