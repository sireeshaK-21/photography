const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection'); // Adjust the path if needed
const User = require('../models/User'); // Import the User model

const seedUsers = async () => {
  try {
    // Read the JSON file
    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'userSeeds.json'), 'utf-8')
    );

    // Sync the database (Ensure this runs before inserting data)
    await sequelize.sync({ force: true }); // WARNING: This will drop and recreate tables!

    // Insert users into the database
    await User.bulkCreate(userData);

    console.log("✅ Users seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding users:", err);
  } finally {
    await sequelize.close(); // Close the database connection
  }
};

// Run the function
seedUsers();
