const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});

module.exports = mongoose.model("Address", addressSchema);