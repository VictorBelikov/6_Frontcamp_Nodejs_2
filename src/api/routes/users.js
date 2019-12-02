const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
