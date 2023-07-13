const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);