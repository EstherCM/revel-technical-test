const productModel = require('../database/models/product.model');
const _ = require('underscore');

const createProduct = async (body) => {
  const { name, description, category, price } = body;

  try {
    return await productModel.create({ name, description, category, price });
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
    return await productModel.find(criterial);
  } catch (e) {
    console.error(`🔥 Error creating product ${e}`);
  }
};

const updateProduct = async () => {
  return;
};

const deleteProduct = async () => {
  return;
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
