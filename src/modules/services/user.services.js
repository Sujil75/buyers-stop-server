const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const provideInvalidData = data => {
    const {email, username, password} = data;

    if (!email) {
        const err = new Error("Please enter an email");
        err.status = 400;

        throw err;
    };

    if (!username) {
        const err = new Error("Please enter a username");
        err.status = 400;

        throw err;
    };

    if (!password) {
        const err = new Error("Please enter a password");
        err.status = 400;

        throw err;
    };
};

const createUser = async data => {
    if (!data) {
        const err = new Error("No User Data Found");
        err.status = 400;

        throw err;
    };

    provideInvalidData(data);

    const existingUser = await User.findOne({
        $or: [
            {username: data.username},
            {email: data.email},
        ],
    });

    if (existingUser) {
        const err = new Error(
            existingUser.email === data.email ? 
                "Email already taken" :
                "Username already taken"
        );

        err.status = 409;

        throw err;
    };

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedData = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        user_type: data.user_type,
        username: data.username,
    };
    
    await User.create(updatedData);

    return "User created successfully";
};

module.exports = {
    createUser,
};