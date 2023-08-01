const authService = require('../services/auth.service');

const signup = (req, res) => {
  const createdUser = authService.signup();
  res.send('signup');
};

const signin = (req, res) => {
  const loggedUser = authService.signin();

  res.send('signin');
};

module.exports = {
  signup,
  signin
}