const express = require('express');
const router = express.Router();
const product = require('../controllers/ProductController');

router.get('/', product.getProduct)
    .post('/create', product.createProduct)

module.exports = router;