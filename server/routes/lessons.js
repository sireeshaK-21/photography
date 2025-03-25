const express = require("express");
const router = express.Router();
const { Lesson } = require("../models/Lesson");
const { authMiddleware } = require("../utils/auth");
const multer = require("multer");
const path = require("path");

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Images only (JPEG, JPG, PNG)"));
    }
  },
});



// 📌 **1. Create a New Lesson**
router.post("/", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const { course_id, title, content, video_url } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!course_id || !title) {
      return res.status(400).json({ message: "Course ID and title are required" });
    }

    const newLesson = await Lesson.create({
      course_id,
      title,
      content,
      video_url,
      photo_url,
    });

    res.status(201).json(newLesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating lesson", error: err });
  }
});

// 📌 **2. Get All Lessons**
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving lessons", error: err });
  }
});

// 📌 **3. Get a Lesson by ID**
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving lesson", error: err });
  }
});

// 📌 **4. Update a Lesson**
router.put("/:id", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const { title, content, video_url } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.update({
      title,
      content,
      video_url,
      ...(photo_url && { photo_url }), // Only update if a new image is uploaded
    });

    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating lesson", error: err });
  }
});

// 📌 **5. Delete a Lesson**
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.destroy();
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lesson", error: err });
  }
});

module.exports = router;
