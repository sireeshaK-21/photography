const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'instructor', 'admin'),
    defaultValue: 'student'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'user'
});

module.exports = User;