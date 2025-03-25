// import all models
const Course = require("./Course");
const User = require("./User");
const EnrolledUser = require("./enrolledUser");

Course.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

User.belongsToMany(Course, {
  through: EnrolledUser,
  foreignKey: "userId",
});

Course.belongsToMany(User, {
  through: EnrolledUser,
  foreignKey: "courseId",
});

module.exports = {
  Course,
  User,
};
