const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  const { body: { name, description, category, price } } = req;

  if (!name || !description || !category || !price) {
    res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  const createdProduct = await productService.createProduct(req.body);

  res.status(201).json({ data: createdProduct });
};

const getProducts = async (req, res) => {
  const products = await productService.getProducts(req.query);

  res.status(200).json({ data: products });
};

const updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id);

  res.status(200).json({ data: updatedProduct });
};

const deleteProduct = async (req, res) => {
  await productService.deleteProduct(req.params.id);

  res.status(200);
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};