const {AppError} = require("./AppError");

class DatabaseConnectionError extends AppError {
    constructor(message) {
        super(message, 500, true);
        this.name = "DatabaseConnectionError";
    };
}

module.exports = DatabaseConnectionError;