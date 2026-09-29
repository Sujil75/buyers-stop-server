const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../core/errors");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) throw new UnauthorizedError("User not authenticated");

        const [schema, token] = authHeader.split(" ");

        if (schema !== "Bearer" || !token) throw new UnauthorizedError("Invalid authorization header");
        
        const verifyToken = jwt.verify(token, secret);

        req.user = verifyToken;

        next();
    } catch (err) {
        next(err);
    };
};

module.exports = AuthMiddleware;