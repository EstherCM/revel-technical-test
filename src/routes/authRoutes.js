const express = require('express');
const router = express.Router();
const { signup, signin, deleteUser } = require('../controllers/authCtrl');
const { validSignUpEvent, checkDuplicateEmail, validSignInEvent, checkPermissions } = require('../middlewares/authMiddleware');
const { verifyToken } = require('../middlewares/jwtMiddleware');

router.post('/signup', validSignUpEvent, checkDuplicateEmail, signup);

router.post('/signin', validSignInEvent, signin);

router.delete('/users/:id', verifyToken, checkPermissions, deleteUser);

module.exports = router;