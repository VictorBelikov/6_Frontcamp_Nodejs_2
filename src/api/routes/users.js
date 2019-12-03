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
router.get('/auth/facebook', userController.authFacebook);
router.get('/auth/facebook/callback', userController.authFacebookCallback);

module.exports = router;
