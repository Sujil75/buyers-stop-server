const errMiddleware = (err, req, res, next) => {
    const status = err.statusCode || 500;

    return res.status(status).json({
        success: false,
        statusCode,
        message: err.message || "Internal server error!",
        errors: err.errors || [],
    });
};

module.exports = errMiddleware;