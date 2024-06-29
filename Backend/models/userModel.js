const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
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
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required',
        },
        len: {
          args: [4], // Minimum length of 4 characters
          msg: 'Username must be at least 4 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required',
        },
        isEmail: {
          msg: 'Invalid email format',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters long',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    region: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  // eslint-disable-next-line no-param-reassign
  user.password = await bcrypt.hash(user.password, salt);
});

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
