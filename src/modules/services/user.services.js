const User = require("../models/user.model");

module.exports.getUser = async data => {
    const {id} = data;
    const user = await User.findById(id);
    
    return {
        data: user,
        message: "Successfully fetched user details",
    };
};

module.exports.putUser = async (...data) => {
    const content = data[0];
    const user = data[1];

    console.log(content, user);
};