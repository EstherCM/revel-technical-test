const userDAO = require('../database/daos/userDAO');
const jwt = require('jsonwebtoken');

const signup = async ({ name, email, password, role }) => {
  try {
    return await userDAO.create({ name, email, password, role });
  } catch (e) {
    return { error: e };
  }
};

const signin = async ({ email, password }) => {
  try {
    const foundUser = await userDAO.get({ email });

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
    return { error: e };
  }
};

const deleteUser = async (id) => {
  try {
    const { deletedCount } = await userDAO.remove(id);

    if (deletedCount !== 1) {
      return { error: 'Something was wrong. User couldn\'t be removed' };
    }
    return { success: true };
  } catch (e) {
    console.error(`🔥 Error deleting user ${e}`);
    return { error: e };
  }
};

module.exports = {
  signup,
  signin,
  deleteUser
};
