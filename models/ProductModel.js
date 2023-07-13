const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please input a valid name'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter price']
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    user_id: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);