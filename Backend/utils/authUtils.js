const jwt = require('jsonwebtoken');

const handleSignUpError = (err) => {
  const error = {
    username: '',
    email: '',
    password: '',
    role: '',
    phone_number: '',
  };
  if (err.code === 11000) {
    if (err.keyValue.email) {
      error.email = 'Email already taken';
    } else if (err.keyValue.username) {
      error.username = 'Username already taken';
    } else if (err.keyValue.phone_number) {
      error.phone_number = 'Phone number already taken';
    }
  } else if (err.errors) {
    if (err.errors.username) {
      error.username = err.errors.username.message;
    }
    if (err.errors.password) {
      error.password = err.errors.password.message;
    }
    if (err.errors.email) {
      error.email = 'Please enter a valid email';
    }
    if (err.errors.role) {
      if (
        err.errors.role.properties &&
        err.errors.role.properties.type === 'enum'
      ) {
        error.role = 'Please enter a valid role: student or launderer';
      } else {
        error.role = err.errors.role.message;
      }
    }
    if (err.errors.phone_number) {
      error.phone_number = err.errors.phone_number.message;
    }
  } else {
    // If no specific errors are found, return the whole error object
    return err;
  }

  return error;
};

const handleLogInError = (err) => {
  const errors = { username: '', password: '' };
  if (err.message === 'User not found') {
    errors.username = err.message;
  } else if (err.message === 'Incorrect password!!') {
    errors.password = err.message;
  }
  return errors;
};

const maxAge = 86400; // 3 days in seconds
const createToken = (username, role, userId, hostel) => {
  return jwt.sign(
    {
      username: username,
      role: role,
      user_id: userId,
      hostel: hostel,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: maxAge }
  );
};

module.exports = {
  handleSignUpError,
  handleLogInError,
  createToken,
};
