const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
    },
    fullname: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
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