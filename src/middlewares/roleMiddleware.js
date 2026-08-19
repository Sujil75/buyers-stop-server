const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const err = new Error("User not Authenticated");
            err.status = 401;

            throw err;
        };

        next();
    };
}

module.exports = roleMiddleware;