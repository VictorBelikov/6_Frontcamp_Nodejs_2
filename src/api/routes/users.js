const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/', userController.getUser);
router.post('/signup', userController.createUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
