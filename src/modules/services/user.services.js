const bcrypt = require("bcrypt");
const { invalidContent } = require("../../handler/errHandlers");
const User = require("../models/user.model");

module.exports.getUserList = async data => {
    const {id} = data;
    
    const userExists = await User.findById(id);

    if (!userExists) invalidContent("User does not exist", 404);

    const user = await User.find(); // password will not be shown

    if (!user) invalidContent("No users added yet", 404);
    
    return {
        data: user,
        message: "Successfully fetched all user details",
    };
};

module.exports.getUserProfile = async data => {
    const {id} = data;
    
    const userExists = await User.findById(id);

    if (!userExists) {
        invalidContent("User does not exist", 404);
    };
    
    return {
        data: userExists,
        message: "Successfully fetched user details",
    };
};

module.exports.putUser = async (...data) => {
    const content = data[0];
    const user = data[1];

    if (content.new_password || content.old_password) {
        if (!content.new_password) invalidContent("Provide a new_password", 404);

        if (!content.old_password) invalidContent("Provide the old_password", 404);

        const adminPassword = (await User.findById(user.id).select("+password"))?.password;

        const isValidPassword = await bcrypt.compare(
            content.old_password, 
            adminPassword
        );

        if (!isValidPassword) invalidContent("Invalid Old Password", 401);
        
        const newHashedPassword = await bcrypt.hash(content.new_password, 10);
        
        delete content.old_password;
        delete content.new_password;
        content.password = newHashedPassword;
    };

    const body = await User.findByIdAndUpdate(
        user.id,
        content,
        {
            new: true,
            runValidators: true,
        },
    );

    if (!body) invalidContent("User not updated successfully", 404);

    return "Data updated successfully";
};

/*
* TODO:
* - Add removing the authentication when user deletes account himself
*/

module.exports.deleteUser = async id => {
    const user = await User.findById(id);

    if (!user) invalidContent("User not found", 404);

    await User.findByIdAndUpdate(
        user.id,
        {
            $unset: {
                refresh_token: 1,
            },
        }
    );

    await User.findByIdAndDelete(id);

    return "User removed successfully";
};