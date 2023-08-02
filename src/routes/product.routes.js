const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');

router.post('/products', verifyToken, createProduct);

router.get('/products', verifyToken, getProducts);

router.put('/products/:id', verifyToken, updateProduct);

router.delete('/products/:id', verifyToken, deleteProduct);

module.exports = router;