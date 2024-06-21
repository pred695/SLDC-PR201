const { Router } = require('express');
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleWare');

const router = Router();
const AuthController = require('../controllers/authController');

router.get('/users', verifyUser, verifyAdmin, AuthController.getAllUsers);
router.post('/signup', verifyAdmin, AuthController.createUser);
router.get('/user/:user_id', AuthController.getUserById);
router.put('/user/:user_id', AuthController.updateUser);
router.delete('/user/:user_id', AuthController.deleteUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logoutUser);
router.put('/make_admin/:user_id', AuthController.updateAdmin);
module.exports = router;
