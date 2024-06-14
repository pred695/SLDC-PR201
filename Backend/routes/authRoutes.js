const { Router } = require('express');

const router = Router();
const AuthController = require('../controllers/authController');

router.get('/users', AuthController.getAllUsers);
router.post('/user', AuthController.createUser);
router.get('/user/:id', AuthController.getUserById);
router.put('/user/:id', AuthController.updateUser);
router.delete('/user/:id', AuthController.deleteUser);

module.exports = router;
