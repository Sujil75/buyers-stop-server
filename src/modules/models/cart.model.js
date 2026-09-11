const BaseModel = require("../../core/base/BaseModel");

const cartSchema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 0,
            min: [0, "Quantity cannot be negative"],
        },
        price: Number,
    }],
    totalAmount: {
        type: Number,
        default: 0,
        min: [0, "Quantity cannot be negative"],
    }
};

const CartModel = new BaseModel("Cart", cartSchema, {collection: "Cart"});
CartModel.addIndex({"items.quantity": 1});

module.exports = CartModel.getModel();