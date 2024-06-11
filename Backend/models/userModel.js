const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define(
  'user',
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
const initUserModel = async () => {
  try {
    await User.sync({ alter: true });
    console.log('User model is successfully synchronized.');
  } catch (err) {
    console.error('Unable to synchronize the user model:', err);
  }
};
module.exports = {
  User,
  initUserModel,
};