const { Router } = require('express');
const { verifyUser } = require('../middlewares/authMiddleWare');

const router = Router();
const AuthController = require('../controllers/authController');

router.get('/users', verifyUser, AuthController.getAllUsers);
router.post('/signup', AuthController.createUser);
router.get('/user/:id', AuthController.getUserById);
router.put('/user/:id', AuthController.updateUser);
router.delete('/user/:id', AuthController.deleteUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logoutUser);
module.exports = router;
