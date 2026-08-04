const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
    },
    item: {
        product: {
            type: ObjectId,
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