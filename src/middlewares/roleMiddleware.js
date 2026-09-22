const RoleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const err = new Error("Insufficient permissions");
            err.status = 401;

            throw err;
        };

        next();
    };
}

module.exports = RoleMiddleware;