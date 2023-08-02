const userModel = require('../database/models/auth.model');
const jwt = require('jsonwebtoken');

const signup = async ({ name, email, password }) => {
  try {
    return await userModel.create({ name, email, password });
  } catch (e) {
    console.error(`🔥 Error registering user ${e}`);
  }
};

const signin = async ({ email, password }) => {
  try {
    const foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      return { error: 'Not Found' };
    }

    //TODO: check password

    const token = jwt.sign(
      { id: foundUser.id },
      process.env.JWT_SECRET || 'super secret',
      {
        expiresIn: '1h',
      }
    );

    return { accessToken: token };
  } catch (e) {
    console.error(`🔥 Error in login ${e}`);
  }
};

module.exports = {
  signup,
  signin,
};
