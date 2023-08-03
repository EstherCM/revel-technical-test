const Product = require('../database/models/product.model');
const _ = require('underscore');

const createProduct = async ({ name, description, category, price }, createdBy) => {
  try {
    return await Product.create({ name, description, category, price, createdBy });
  } catch (e) {
    console.error(`🔥 Error creating product ${e}`);
  }
};

const getProducts = async (query) => {
  const criterial = {};

  const propsToFind = ['id', 'name', 'description', 'category', 'price'];

  propsToFind.forEach((prop) => {
    if (_.has(query, prop)) {
      criterial[prop] = query[prop];
    }
  });

  try {
    return await Product.find(criterial);
  } catch (e) {
    console.error(`🔥 Error creating product ${e}`);
  }
};

const updateProduct = async (id, { name, description, category, price }) => {
  try {
    return await Product.findOneAndUpdate(
      { _id: id },
      { name, description, category, price },
      { new: true }
    );
  } catch (e) {
    console.error(`🔥 Error updating product ${e}`);
  }
};

const deleteProduct = async (id) => {
  try {
    const { deletedCount } = await Product.deleteOne({ _id: id });

    if (deletedCount !== 1) {
      return { message: 'Something was wrong' };
    }
    return { sucess: true };
  } catch (e) {
    console.error(`🔥 Error deleting product ${e}`);
    return { message: e };
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
