const AppError = require("./AppError");

class InvalidContentError extends AppError {
    constructor(message, statusCode = 400) {
        super(message, statusCode);
        this.name = "InvalidContentError";
    };
};

module.exports = InvalidContentError;