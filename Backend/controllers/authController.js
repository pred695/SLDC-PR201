const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../models/userModel');
const authUtils = require('../utils/authUtils');

const maxAge = 86400; // 3 days in seconds

// @desc Create a new user
// @route POST /user
// @access Private
const createUser = async (req, resp) => {
  try {
    const { username, email, password, isAdmin, region } = req.body;
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
      isAdmin: isAdmin,
      region: region,
    });
    resp.status(201).json({
      user_id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      region: newUser.region,
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
// @route GET /user/:user_id
// @access Private
const getUserById = async (req, resp) => {
  const userId = req.params.user_id;
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
// @route PUT /user/:user_id
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
// @route DELETE /user/:user_id
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

// @desc    Log in a user
// @route   POST /login
// @access  Public
const loginUser = async (req, resp) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = authUtils.createToken(
          user.username,
          user.user_id,
          user.isAdmin,
          user.email
        );
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);
        resp.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
          secure: true, // set to true if your using https
          sameSite: 'strict',
        }); // Set the cookie

        resp.status(200).json({
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          region: user.region,
        });
      } else {
        throw new Error('Incorrect password!!');
      }
    } else if (user === null) {
      throw new Error('User not found');
    }
  } catch (err) {
    resp.status(401).json('Credentials wrong!');
  }
};
// @desc    Log out a user
// @route   GET /logout
// @access  Public
const logoutUser = async (req, resp) => {
  resp.cookie('jwt', '', {
    httpOnly: true,
    maxAge: -1,
    secure: true, // set to true if your using https
    sameSite: 'none',
  }); // negative maxAge so that the cookie expires immediately

  resp.status(200).json({
    message: 'User logged out successfully',
  });
};

// @desc Make an user admin
// @route PUT /make_admin/:user_id
const updateAdmin = async (req, resp) => {
  try {
    const [updatedRowsCount] = await User.update(
      {
        isAdmin: true,
      },
      {
        where: {
          user_id: req.params.user_id,
        },
      }
    );

    if (updatedRowsCount === 0) {
      return resp.status(404).json({ message: 'User not found' });
    }

    resp.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    resp.status(500).json({ message: 'An error occurred' });
  }
};

// @desc Forgot Password
// @route POST /forgotpassword
// @access Public
const forgotPassword = async (req, resp) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      resp.status(404).json({ message: 'User not found' });
      return;
    }
    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, isAdmin: user.isAdmin },
      secret,
      { expiresIn: '15m' }
    );
    const url = `${process.env.CLIENT_URL}/resetpassword/${user.user_id}/${token}`;
    console.log(url);
    // eslint-disable-next-line no-unused-vars
    const testAccount = await nodemailer.createTestAccount();
    // connect with smtp
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"SLDC" <laundrix5@gmail.com>',
      to: email,
      subject: 'Reset Password link from SLDC',
      text: `Click on this link to reset your password: ${url}`,
      html: `<b>Click on this link to reset your password: <a href="${url}">Reset Password</a></b>`,
    });
    console.log('Message sent: %s', info.messageId);
    resp.status(200).json(info);
  } catch (err) {}
};

const getResetPassword = async (req, resp) => {
  try {
    const { user_id, token } = req.params;
    const user = await User.findByPk(user_id);
    if (!user) {
      resp.status(404).json({ message: 'User not found' });
      return;
    }
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET + user.password
    );
    resp.render('index', {
      email: decodedToken.email,
    });
    console.log(decodedToken.email);
    // resp.status(200).json({message: 'Token verified'});
    console.log(user);
  } catch (err) {
    console.error(err);
    resp.status(404).json({ message: 'Invalid token' });
  }
};
const postResetPassword = async (req, resp) => {
  const { user_id, token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      resp.status(404).json({ message: 'User not found' });
      return;
    }
    if (!password) {
      return resp.status(401).render('index', {
        status: 'not verified',
        error: 'Password cannot be empty',
      });
    }
    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET + user.password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.update(
      { password: encryptedPassword },
      { where: { user_id: user_id } }
    );
    resp.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    resp.status(404).json({ message: 'Error updating the password' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  updateAdmin,
  forgotPassword,
  getResetPassword,
  postResetPassword,
};
