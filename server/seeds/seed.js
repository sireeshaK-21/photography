// Import required packages
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
// Import models
const { Course, User, EnrolledUser, Lesson, Review } = require("../models");
// Import seed data
const coursesData = require("./courseSeeds.json");
const usersData = require("./userSeeds.json");
const lessonsData = require("./lessonSeeds.json");
const reviewsData = require("./reviewSeeds.json");
// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log(":arrows_anticlockwise: Database synced successfully.");
  // Hash the password for each user
  for (const user of usersData) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  // Create users
  const users = await User.bulkCreate(usersData);
  console.log(":white_tick: Users seeded.");
  // Create courses
  const courses = [];
  for (const course of coursesData) {
    course.created_by = users[Math.floor(Math.random() * users.length)].id;
    const newCourse = await Course.create(course);
    courses.push(newCourse);
  }
  console.log(":white_tick: Courses seeded.");
  // Enroll users in courses
  for (const course of courses) {
    const usersToEnroll = Math.floor(Math.random() * users.length); // Random number of enrollments
    const potentialUsers = [...users];
    for (let i = 0; i < usersToEnroll; i++) {
      const user = potentialUsers.splice(Math.floor(Math.random() * potentialUsers.length), 1)[0];
      try {
        await EnrolledUser.create({
          student_id: user.id,   // Make sure user.id exists
          course_id: course.id,   // Make sure course.id exists
          progress: 50,
          enrolled_at: new Date(),
        });
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          console.log(`:warning: Duplicate enrollment skipped: User ${user.id} in Course ${course.id}`);
        } else {
          throw error;
        }
      }
    }
  }
  console.log(":white_tick: Users enrolled in courses.");
  // Create lessons for courses
  for (const lesson of lessonsData) {
    lesson.course_id = courses[Math.floor(Math.random() * courses.length)].id;
    await Lesson.create(lesson);
  }
  console.log(":white_tick: Lessons seeded.");
  // Create reviews for courses
  for (const review of reviewsData) {
    review.courseId = courses[Math.floor(Math.random() * courses.length)].id;
    review.userId = users[Math.floor(Math.random() * users.length)].id;
    await Review.create(review);
  }
  console.log(":white_tick: Reviews seeded.");
  console.log(":tada: Database seeding completed.");
  process.exit(0);
};
// Call seedDatabase function
seedDatabase();






