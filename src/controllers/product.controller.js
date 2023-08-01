const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  const { body: { name, description, category, price } } = req;

  if (!name || !description || !category || !price) {
    res.send({ status: 400, error: 'Bad Request: Some properties are missing' });
  }

  const createdProduct = await productService.createProduct(req.body);

  res.status(201).send({ data: createdProduct });
};

const getProducts = async (req, res) => {
  const products = await productService.getProducts(req.query);

  res.status(200).send({ data: products });
};

const updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id);

  res.status(200).send({ data: updatedProduct });
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