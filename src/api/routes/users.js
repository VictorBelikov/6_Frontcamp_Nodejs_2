const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.delete('/:userId', userController.deleteUser);
router.get('/redirectsuccess', userController.redirectUserSuccess)
router.get('/redirectfailed', userController.redirectUserFail)

module.exports = router;
