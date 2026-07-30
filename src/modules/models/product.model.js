const mongoose = require('mongoose');

/*
* TODO:
* - Add product rating based on customer rating on products 
*/

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true,
    },
    product_img: [{
        type: String,
        required: true,
        match: [
            /^(https?:\/\/[^\s$.?#].[^\s]*)$/, "Please provide valid image address"
        ],
    }],
    remaining_product_count: {
        type: Number,
        minlength: 0,
        default: 0,
    },
    product_in_stock: {
        type: Boolean,
        default: false
    },
    product_description: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true,
}); 

module.exports = mongoose.model("Product", productSchema);