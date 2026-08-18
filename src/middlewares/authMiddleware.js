const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuthenticator = (req, res, next) => {
    try {
        const content = req.body;
    } catch (err) {
        next(err);
    };
};

module.exports = userAuthenticator;