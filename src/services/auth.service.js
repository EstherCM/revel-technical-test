const User = require('../database/models/auth.model');
const jwt = require('jsonwebtoken');

const signup = async ({ name, email, password, role }) => {
  try {
    return await User.create({ name, email, password, role });
  } catch (e) {
    console.error(`🔥 Error registering user ${e}`);
  }
};

const signin = async ({ email, password }) => {
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      console.log('🤷 User not found');
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

const deleteUser = async (id) => {
  try {
    const { deletedCount } = await User.deleteOne({ _id: id });

    if (deletedCount !== 1) {
      return { message: 'Something was wrong' };
    }
    return { sucess: true };
  } catch (e) {
    console.error(`🔥 Error deleting user ${e}`);
    return { message: e };
  }
};

module.exports = {
  signup,
  signin,
  deleteUser
};
