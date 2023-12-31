const Product = require('../models/productModel');

const create = async (body) => {
  try {
    return await Product.create(body);
  } catch (e) {
    console.error(`🔥 [DAO] Error creating product ${e}`);
    return e;
  }
};

const getBy = async (query) => {
  try {
    return await Product.find(query);
  } catch (e) {
    console.error(`🔥 [DAO] Error getting product by ${query} ${e}`);
    return e;
  }
};

const update = async (id, propsToUpdate) => {
  try {
    return await Product.findByIdAndUpdate({ _id: id }, propsToUpdate, { new: true });
  } catch (e) {
    console.error(`🔥 [DAO] Error updating product ${e}`);
    return e;
  }
};

const remove = async (id) => {
  try {
    return await Product.deleteOne({ _id: id });
  } catch (e) {
    console.error(`🔥 Error deleting product ${e}`);
    return e;
  }
};

module.exports = {
  create,
  getBy,
  update,
  remove
};
