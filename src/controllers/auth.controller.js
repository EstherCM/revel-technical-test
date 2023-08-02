const authService = require('../services/auth.service');

const signup = async (req, res) => {
  const { body: { name, email, password } } = req;
  const createdUser = await authService.signup({ name, email, password });

  res.status(201).json({ message: createdUser });
};

const signin = async (req, res) => {
  const { body: { email, password } } = req;
  const result = await authService.signin({ email, password });

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.status(200).json(result);
};

module.exports = {
  signup,
  signin
}