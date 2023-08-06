const authService = require('../services/authService');

const signup = async (req, res, next) => {
  const { body: { name, email, password } } = req;
  try {
    const createdUser = await authService.signup({ name, email, password });

    res.status(201).json({ data: createdUser });
  } catch (e) {
    return next(e);
  }
};

const signin = async (req, res, next) => {
  const { body: { email, password } } = req;
  try {
    const result = await authService.signin({ email, password });

    if (result.error) {
      return next(createError(404, result.error));
    }

    res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await authService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  signup,
  signin,
  deleteUser
}