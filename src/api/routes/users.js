const express = require('express');
const userController = require('../controllers/users');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.createUser);
router.get('/login', userController.loginUserGet);
router.post('/login', userController.loginUserPost);
router.delete('/:userId', auth, userController.deleteUser);
router.get('/authSuccess', userController.authSuccess);
router.get('/logout', userController.logout);

module.exports = router;
