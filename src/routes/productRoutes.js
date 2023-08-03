const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productCtrl');
const { verifyToken } = require('../middlewares/jwtMiddleware');
const { dataSecurity } = require('../middlewares/authMiddleware');
const { validCreateProductEvent } = require('../middlewares/productMiddleware');

router.post('/products', verifyToken, validCreateProductEvent, createProduct);

router.get('/products', verifyToken, getProducts);

router.put('/products/:id', verifyToken, dataSecurity, updateProduct);

router.delete('/products/:id', verifyToken, dataSecurity, deleteProduct);

module.exports = router;