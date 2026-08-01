const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    }, 
    product: {
        type: ObjectId,
        ref: "Product",
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    collection: "Customer_Reviews"
});

module.exports = mongoose.model("Customer_Reviews", reviewSchema);