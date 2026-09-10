const BaseModel = require("../../core/base/BaseModel");

const reviewSchema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    product: {
        type: ObjectId,
        ref: "Product",
    }, 
    review: String,
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
};

const reviewModel = new BaseModel("Customer_Reviews", reviewSchema);

reviewModel.addIndex({product: 1});

module.exports = reviewModel.getModel();