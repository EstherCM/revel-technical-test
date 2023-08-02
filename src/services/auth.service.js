const User = require('../database/models/auth.model');
const jwt = require('jsonwebtoken');

const signup = async ({ name, email, password }) => {
  try {
    return await User.create({ name, email, password });
  } catch (e) {
    console.error(`🔥 Error registering user ${e}`);
  }
};

const signin = async ({ email, password }) => {
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return { error: 'Not Found' };
    }

    if (await foundUser.checkPassword(password)) {
      const token = jwt.sign(
        {
          id: foundUser.id,
          role: foundUser.role
        },
        process.env.JWT_SECRET || 'super secret',
        {
          expiresIn: '1h',
        }
      );
  
      return { accessToken: token };
    }
    return { error: 'Email or password incorrect' };
  } catch (e) {
    console.error(`🔥 Error in login ${e}`);
  }
};

module.exports = {
  signup,
  signin,
};
