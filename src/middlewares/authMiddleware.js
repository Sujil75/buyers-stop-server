const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../core/errors");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const AuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) throw new UnauthorizedError("User not authenticated");

        const token = authHeader.split(" ")[1];
        
        const verifyToken = await jwt.verify(token, secret);

        if (!verifyToken) throw new UnauthorizedError("Invalid Token")

        req.user = verifyToken;

        next();
    } catch (err) {
        next(err);
    };
};

module.exports = AuthMiddleware;