const BaseModel = require("../../core/base/BaseModel");

const addressSchema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    address_line1: {
        type: String,
        trim: true,
    },
    address_line2: {
        type: String,
        trim: true,
    },
    city: String,
    state: String,
    country: {
        type: String,
        uppercase: true
    },
    pincode: Number
};

const addressModel = new BaseModel("Address", addressSchema, {collection: "Address"});

module.exports = addressModel.getModel();