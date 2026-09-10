const BaseModel = require("../../core/base/BaseModel");

const couponSchema = {
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
};

const couponModel = new BaseModel("Coupon", couponSchema);
couponModel.addIndex({expiryDate: 1});

module.exports = couponModel.getModel();