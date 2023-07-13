const Product = require('../models/ProductModel');

const getProduct = async (req, res) => {
    const all_product = await Product.find();
    res.status(200).send(all_product);
}

const createProduct = async (req, res) => {
    // const { name, price, brand, quantity } = req.body;

    const createProduct = await Product.create(
        {
            // name,
            // price,
            // brand,
            // quantity
            user_id: null,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
            quantity: req.body.quantity,
        }
    );
    res.status(201).send(createProduct);
}

module.exports = { getProduct, createProduct };