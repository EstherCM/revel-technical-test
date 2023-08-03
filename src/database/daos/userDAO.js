const User = require('../models/userModel');

const create = async (body) => {
  try {
    return await User.create(body);
  } catch (e) {
    console.error(`🔥 [DAO] Error creating user ${e}`);
    return e;
  }
};

const get = async (query) => {
  try {
    return await User.findOne(query);
  } catch (e) {
    console.error(`🔥 [DAO] Error getting user ${e}`);
    return e;
  }
};

const remove = async (id) => {
  try {
    return await User.deleteOne({ _id: id });
  } catch (e) {
    console.error(`🔥 Error deleting product ${e}`);
    return e;
  }
};

module.exports = {
  create,
  get,
  remove
};
