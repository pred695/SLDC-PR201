const jwt = require('jsonwebtoken');

const verifyUser = (req, resp, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        // eslint-disable-next-line no-unused-vars
        async (err, decodedToken) => {
          if (err) {
            console.error(err);
            resp.status(401).json({ message: 'Unauthorized' });
          } else {
            next();
          }
        }
      );
    } else {
      resp.status(401).json({ message: 'Unauthorized' }); // Return an unauthorized response
    }
  } catch (err) {
    console.error(err);
    resp.status(500).json({ message: 'Internal Server Error' });
  }
};

const verifyAdmin = (req, resp, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      resp.status(401).json('User not logged in!');
      return;
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken.isAdmin) {
      resp.status(401).json('User does not have admin rights');
    } else {
      next();
    }
  } catch (err) {
    resp.status(400).json('Error verifying the details');
  }
};
module.exports = {
  verifyUser,
  verifyAdmin,
};
