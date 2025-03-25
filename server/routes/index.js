const router = require("express").Router();

//const courseRoutes = require("./course");
//const categoryRoutes = require("./category");
const userRoutes = require("./user");
const lessonsRoutes = require("./lessons");
const reviewsRoutes = require("./reviewRoutes");

// create a default route for /api
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

//router.use("/api/courses", courseRoutes);
router.use("/api/users", userRoutes);
router.use("/api/lessons", lessonsRoutes);
router.use("/api/reviews", reviewsRoutes);

module.exports = router;