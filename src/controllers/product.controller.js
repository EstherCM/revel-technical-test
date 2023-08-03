const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  const { body: { name, description, category, price } } = req;
  const createdBy = req.user.id;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  const createdProduct = await productService.createProduct(req.body, createdBy);

  res.status(201).json({ data: createdProduct });
};

const getProducts = async (req, res) => {
  const products = await productService.getProducts(req.query);

  res.status(200).json({ data: products });
};

const updateProduct = async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.id, req.body);

  res.status(200).json({ data: updatedProduct });
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch(e) {
    return res.status(500).json({ message: e });
  }

};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};