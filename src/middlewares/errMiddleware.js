const errMiddleware = (err, req, res, next) => {
    const status = err.status || 500;

    return res.status(status).json({
        success: "Failed",
        status,
        message: err.message || "Internal server error!",
        errors: err.errors || [],
    });
};

module.exports = errMiddleware;