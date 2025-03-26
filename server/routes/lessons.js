const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson");
const { authMiddleware } = require("../utils/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Images only (JPEG, JPG, PNG)"));
    }
  },
});

// 📌 **Create a New Lesson**
router.post("/", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    console.log("File received:", req.file);
    console.log("Request body:", req.body);

    const { course_id, title, content, video_url } = req.body;
   
    const photo_url = req.file
  ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
  : null;

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
    console.error("Error creating lesson:", err);
    res.status(500).json({ message: "Error creating lesson", error: err.message });
  }
});

// 📌 **Get All Lessons**
router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.findAll();
    res.status(200).json(lessons);
  } catch (err) {
    console.error("Error retrieving lessons:", err);
    res.status(500).json({ message: "Error retrieving lessons", error: err.message });
  }
});

// 📌 **Get a Lesson by ID**
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (err) {
    console.error("Error retrieving lesson:", err);
    res.status(500).json({ message: "Error retrieving lesson", error: err.message });
  }
});

// 📌 **Update a Lesson**
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
      ...(photo_url && { photo_url }),
    });

    res.status(200).json({ message: "Lesson updated successfully", lesson });
  } catch (err) {
    console.error("Error updating lesson:", err);
    res.status(500).json({ message: "Error updating lesson", error: err.message });
  }
});

// 📌 **Delete a Lesson**
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    await lesson.destroy();
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (err) {
    console.error("Error deleting lesson:", err);
    res.status(500).json({ message: "Error deleting lesson", error: err.message });
  }
});

// 📌 **Serve Static Files (So Images Can Load in Frontend)**
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;