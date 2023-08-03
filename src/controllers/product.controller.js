const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  const { body: { name, description, category, price } } = req;
  const createdBy = req.user.id;

  if (!name || !description || !category || !price) {
    return res.status(400).json({ message: 'Bad Request: Some properties are missing' });
  }

  try {
    const createdProduct = await productService.createProduct(req.body, createdBy);

    res.status(201).json({ data: createdProduct });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);

    res.status(200).json({ data: products });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);

    res.status(200).json({ data: updatedProduct });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch(e) {
    return res.status(500).json(e);
  }

};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
};