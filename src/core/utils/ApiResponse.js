class ApiResponse {
    constructor(statusCode, message, data = null, meta = null) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta; // for pagination
    };

    static created(message, data, meta) {
        return new ApiResponse(201, message, data, meta);
    };

    static ok(message, data, meta) {
        return new ApiResponse(200, message, data, meta);
    };
    
    static noContent(message = "Success") {
        return new ApiResponse(204, message, null);
    };

    send(res) {
        const response = {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
        };

        if (this.data !== null) response.data = this.data;
        if (this.meta !== null) response.data = this.data;

        return res.status(this.statusCode).json(response);
    };
}

module.exports = ApiResponse;