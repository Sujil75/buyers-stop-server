const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
    },
    product_img: {
        type: String,
        match: [
            /^(https?:\/\/[^\s$.?#].[^\s]*)$/, "Please provide valid image address"
        ],
    }
}, {
    timestamps: true,
    collection: "Customer_Reviews"
});

module.exports = mongoose.model("Customer_Reviews", reviewSchema);