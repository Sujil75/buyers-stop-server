const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: String,

    discountType: {
        type: String,
        enum: ["percentage", "fixed"]
    },

    value: Number,

    minimumPurchase: {
        type: Number,
        min: 0,
        default: 0,
    },

    expiryDate: Date,

    usageLimit: {
        type: Number,
        default: 1,
        min: 1,
    },

    usedCount: {
        type: Number,
        default: 0,
        min: 0,
    },

    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model("Coupons", couponSchema);