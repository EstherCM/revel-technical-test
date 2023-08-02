const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/auth.controller');
const { validSingUpEvent, checkDuplicateEmail, validSingInEvent } = require('../middlewares/auth.middleware');

router.post('/signup', validSingUpEvent, checkDuplicateEmail, signup);

router.post('/signin', validSingInEvent, signin);

//TODO: delete user

module.exports = router;