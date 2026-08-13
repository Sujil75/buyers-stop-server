const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    item: {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: true,
            min: 0
        },
        price: Number,
    },
    totalAmount: {
        type: Number,
        trim: true,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Cart", cartSchema);