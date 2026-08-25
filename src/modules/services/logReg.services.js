const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const secret = process.env.JWT_SECRET;

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

module.exports.createUser = async data => {
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

module.exports.validateUser = async data => {
    const admin = await User.findOne({
        $and: [
            {username: data.username},
            {email: data.email},
        ]
    });
    
    if (admin === null) {
        const err = new Error(
            admin.email !== data.email ? 
                "Your email doesn't match" :
                "Your username doesn't match"
        );

        err.status = 409;

        throw err;
    };

    const checkPassword = await bcrypt.compare(data.password, admin.password);

    if (!checkPassword) {
        const err = new Error("Password is incorrect");
        err.status = 401;

        throw err;
    };

    const body = {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.user_type,
    }
    
    const token = jwt.sign(
        body, secret, {
            expiresIn: "1d"
        }
    );

    return token;
};