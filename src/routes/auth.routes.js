const express = require('express');
const router = express.Router();
const { signup, signin, deleteUser } = require('../controllers/auth.controller');
const { validSignUpEvent, checkDuplicateEmail, validSignInEvent, checkPermissions } = require('../middlewares/auth.middleware');
const { verifyToken } = require('../middlewares/jwt.middleware');

router.post('/signup', validSignUpEvent, checkDuplicateEmail, signup);

router.post('/signin', validSignInEvent, signin);

router.delete('/users/:id', verifyToken, checkPermissions, deleteUser);

module.exports = router;