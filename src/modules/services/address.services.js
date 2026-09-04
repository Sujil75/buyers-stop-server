const { invalidContent } = require("../../handler/errHandlers");
const Address = require("../models/address.model");

module.exports.getAddress = async data => {
    console.log(data);
};

module.exports.postAddress = async (...data) => {
    const user = data[0];
    const body = data[1];

    const address = await Address.create(body);
    if (!address) invalidContent("Address not added", 500);

    return "Address added successfully";
}; 