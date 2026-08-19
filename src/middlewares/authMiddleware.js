const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

function notAuthenticatedOrAuthorized(content) {
    let err;

    if (!content) {
        err = new Error("User not authenticated");
        err.status = 401;
        
        throw err;
    };

    
    err = new Error(content);
    err.status = 401;
    
    throw err;
};

const userAuthenticator = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) notAuthenticatedOrAuthorized()

        const token = authHeader.split(" ")[1];
        
        const verifyToken = await jwt.verify(token, secret);

        if (!verifyToken) notAuthenticatedOrAuthorized("Invalid Token");

        req.user = verifyToken;

        next();
    } catch (err) {
        next(err);
    };
};

module.exports = userAuthenticator;