const router = require("express").Router();
const { User } = require("../models/User");
const {  Course } = require("../models/Course");
const { Review } = require("../models/Review");
const { authMiddleware } = require("../utils/auth");

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ["name"] },
        { model: Course, attributes: ["title"] },
      ],
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET reviews for a specific course
router.get("/course/:courseId", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { course_id: req.params.courseId },
      include: [{ model: User, attributes: ["name"] }],
    });

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this course" });
    }

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new review (requires authentication)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { course_id, rating, comment } = req.body;

    // Ensure user is enrolled before reviewing
    const enrollment = await Enrollment.findOne({
      where: { student_id: req.user.id, course_id },
    });

    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled to review this course" });
    }

    const review = await Review.create({
      course_id,
      student_id: req.user.id,
      rating,
      comment,
      created_at: new Date(),
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Review creation error:", err);
    res.status(400).json({ error: "Failed to create review" });
  }
});

// DELETE a review (only the creator or admin can delete)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Check if the user is the creator or an admin
    if (review.student_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await review.destroy();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
