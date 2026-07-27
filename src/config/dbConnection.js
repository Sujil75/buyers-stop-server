const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Server connected successfully");
    } catch (err) {
        throw new Error("Data not connected");
        process.exit(1);
    };
};

module.exports = dbConnection