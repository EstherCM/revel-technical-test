const authService = require('../services/auth.service');

const signup = async (req, res) => {
  const { body: { name, email, password, role } } = req;
  try {
    const createdUser = await authService.signup({ name, email, password, role });

    res.status(201).json({ data: createdUser });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const signin = async (req, res) => {
  const { body: { email, password } } = req;
  try {
    const result = await authService.signin({ email, password });

    if (result.error) {
      return res.status(404).json(result.error);
    }

    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await authService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  signup,
  signin,
  deleteUser
}