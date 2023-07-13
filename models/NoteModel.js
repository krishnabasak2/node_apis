const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: [true, "Titele id required"]
    },
    des: {
        type: String,
        required: [true, "Description is required"]
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('note', noteSchema);