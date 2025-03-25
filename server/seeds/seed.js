const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const User = require('../models/User');

const seedUsers = async () => {
  try {
    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'userSeeds.json'), 'utf-8')
    );

    await sequelize.sync({ force: true });

    const hashedUsers = await Promise.all(
      userData.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );

    await User.bulkCreate(hashedUsers);

    console.log("✅ Users seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding users:", err);
  } finally {
    await sequelize.close();
  }
};

seedUsers();
