const ProductDAO = require('../database/daos/productDAO');
const _ = require('underscore');

const createProduct = async ({ name, description, category, price }, createdBy) => {
  try {
    return await ProductDAO.create({ name, description, category, price, createdBy });
  } catch (e) {
    return { error: e };
  }
};

const getProducts = async (query) => {
  const criterial = {};

  const propsToFind = ['_id', 'name', 'description', 'category', 'price'];

  propsToFind.forEach((prop) => {
    if (_.has(query, prop)) {
      criterial[prop] = query[prop];
    }
  });

  try {
    return await ProductDAO.getBy(criterial);
  } catch (e) {
    return { error: e };
  }
};

const updateProduct = async (id, { name, description, category, price }) => {
  try {
    return await ProductDAO.update(id, { name, description, category, price });
  } catch (e) {
    return { error: e };
  }
};

const deleteProduct = async (id) => {
  try {
    const { deletedCount } = await ProductDAO.remove(id);

    if (deletedCount !== 1) {
      return { error: 'Something was wrong' };
    }
    return { sucess: true };
  } catch (e) {
    return { error: e };
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};
