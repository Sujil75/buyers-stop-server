const { invalidContent } = require("../../handler/errHandlers");
const Address = require("../models/address.model");

module.exports.getAddress = async data => {
    const address = await Address.find();
    
    if (!address) invalidContent("Missing address, please add one", 404);

    return {
        message: "Successfully fetched address",
        data: address,
    };
};

module.exports.postAddress = async (...data) => {
    const user = data[0];
    const body = data[1];

    const updatedAddress = {
        user: user.id,
        address_line1: body.address_line1,
        address_line3: body.address_line2,
        city: body.city,
        country: body.country,
        pincode: body.pincode
    }

    const address = await Address.create(updatedAddress);

    if (!address) invalidContent("Address not added", 500);

    return "Address added successfully";
}; 