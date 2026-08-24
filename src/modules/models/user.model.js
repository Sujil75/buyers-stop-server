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
    user_type: {
        type: String,
        enum: ["consumer", "retailer"],
        default: "consumer",
    },
    user_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema)