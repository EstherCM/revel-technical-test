const productService = require('../services/productService');

const createProduct = async (req, res, next) => {
  try {
    const createdBy = req.user.id;
    const createdProduct = await productService.createProduct(req.body, createdBy);

    res.status(201).json(createdProduct);
  } catch (e) {
    return next(e);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query);

    res.status(200).json(products);
  } catch (e) {
    return next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);

    res.status(200).json(updatedProduct);
  } catch (e) {
    return next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch(e) {
    return next(e);
  }

};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};