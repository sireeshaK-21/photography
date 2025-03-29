const Course = require("./Course");
const User = require("./User");
const EnrolledUser = require("./Enrollment");
const Lesson = require("./Lesson");
const Review = require("./Review");

// Define relationships
User.belongsToMany(Course, {
  through: EnrolledUser,
  foreignKey: "studentId",
});

Course.belongsToMany(User, {
  through: EnrolledUser,
  foreignKey: "courseId",
});

Course.hasMany(Lesson, {
  foreignKey: "course_id",
  onDelete: "CASCADE",
});
Lesson.belongsTo(Course, {
  foreignKey: "course_id",
});
Course.hasMany(Review, {
  foreignKey: "courseId",
  onDelete: "CASCADE",
});
Review.belongsTo(Course, {
  foreignKey: "courseId",
});
User.hasMany(Review, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Review.belongsTo(User, {
  foreignKey: "userId",
});
module.exports = {
  Course,
  User,
  EnrolledUser,
  Lesson,
  Review,
};