const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    }, 
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter valid email format"
        ],
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    product_reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer_Reviews"
    },
}, {
    timestamps: true,
});

mongoose.model.exports = mongoose.model("User", userSchema)