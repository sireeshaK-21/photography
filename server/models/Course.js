const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
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
    modelName: 'course'
  });
  
  module.exports = Course;