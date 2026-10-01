const AppError = require("./AppError");

class DatabaseConnectionError extends AppError {
    constructor(message) {
        super(message, 503, true);
        this.name = "DatabaseConnectionError";
    };
}

module.exports = DatabaseConnectionError;