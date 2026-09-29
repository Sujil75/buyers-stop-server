const {
    ForbiddenError,
} = require("../core/errors");

const RoleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ForbiddenError("Insufficient permissions"));
        };

        next();
    };
}

module.exports = RoleMiddleware;