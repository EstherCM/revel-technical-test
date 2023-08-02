const User = require('../database/models/auth.model');

const validSingUpEvent = (req, res, next) => {
  const { body: { name, email, password } } = req;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  next();
};

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
      return res.status(400).json({ message: 'Bad Request: Email is already in use' });
    }
    next();
  } catch(e) {
    console.error(`🔥 Error finding user by email ${e}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const validSingInEvent = (req, res, next) => {
  const { body: { email, password } } = req;

  if (!email || !password) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  next();
};

module.exports = {
  validSingUpEvent,
  checkDuplicateEmail,
  validSingInEvent
}