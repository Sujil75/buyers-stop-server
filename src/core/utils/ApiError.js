class ApiError {
    constructor(statusCode, name, message, details = null) {
        this.success = false;
        this.statusCode = statusCode;
        this.error = {
            name,
            message,
        };

        if (details) this.error.details = details;
    };
    
    static badRequest(message, details) {
      return new ApiError(400, 'BadRequestError', message, details);
    };

    static unauthorized(message = 'Unauthorized') {
      return new ApiError(401, 'UnauthorizedError', message);
    };

    static forbidden(message = 'Forbidden') {
      return new ApiError(403, 'ForbiddenError', message);
    };

    static notFound(message = 'Resource not found') {
      return new ApiError(404, 'NotFoundError', message);
    };

    static conflict(message = 'Resource already exists') {
      return new ApiError(409, 'ConflictError', message);
    };

    static validation(message = 'Validation failed', details) {
      return new ApiError(422, 'ValidationError', message, details);
    };

    static internal(message = 'Internal server error') {
      return new ApiError(500, 'InternalServerError', message);
    };

    send(res) {
      return res.status(this.statusCode).json({
        success: this.success,
        statusCode: this.statusCode,
        error: this.error,
      });
    };
}

module.exports = ApiError;