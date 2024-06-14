const { User } = require('../models/userModel');

// @desc Create a new user
// @route POST /user
// @access Private
const createUser = async (req, resp) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });
    resp.status(201).json({
      user: newUser,
    }); // Created status code
  } catch (err) {
    resp.status(500).json(err.errors[0].message);
  }
};

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, resp) => {
  try {
    const users = await User.findAll();
    resp.json({
      users: users,
    });
  } catch (err) {
    resp.status(500).json({ message: 'Error retrieving users' }); // Internal server error
  }
};

// @desc Get a user by ID
// @route GET /user/:id
// @access Private
const getUserById = async (req, resp) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return resp.status(404).json({ message: 'User not found' }); // Not found status code
    }
    resp.json(user);
  } catch (err) {
    resp.status(500).json({ message: 'Error retrieving user' }); // Internal server error
  }
};

// @desc Update a user by ID
// @route PUT /user/:id
// @access Private
const updateUser = async (req, resp) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const [updatedCount] = await User.update(
      { name, email, password },
      { where: { user_id: userId } }
    );
    if (updatedCount === 0) {
      return resp.status(404).json({ message: 'User not found' }); // Not found status code
    }
    const updatedUser = await User.findByPk(userId);
    resp.json(updatedUser);
  } catch (err) {
    resp
      .status(500)
      .json({ message: 'Error updating user', error: err.message }); // Internal server error
  }
};

// @desc Delete a user by ID
// @route DELETE /user/:id
// @access Private
const deleteUser = async (req, resp) => {
  const userId = req.params.id;
  try {
    const deletedCount = await User.destroy({ where: { user_id: userId } });
    if (deletedCount === 0) {
      return resp.status(404).json({ message: 'User not found' }); // Not found status code
    }
    resp.status(204).json({
      message: 'User deleted successfully',
    }); // No content status code (success)
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: 'Error deleting user' }); // Internal server error
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
