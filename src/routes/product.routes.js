const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');
const { dataSecurity } = require('../middlewares/auth.middleware');

router.post('/products', verifyToken, createProduct);

router.get('/products', verifyToken, getProducts);

router.put('/products/:id', verifyToken, dataSecurity, updateProduct);

router.delete('/products/:id', verifyToken, dataSecurity, deleteProduct);

module.exports = router;