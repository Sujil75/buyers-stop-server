module.exports.missingBodyErrHandler = (data, next) => {
    let err;

    if (!data) {
        err = new Error("No content body found");
        err.status = 400;

        next(err);
    };

    if (Object.keys(data).length <= 0) {
        err = new Error("Request body missing");
        err.status = 404;

        next(err);
    };
};

module.exports.invalidContent = (msg, status) => {
    const err = new Error(msg);
    err.status = status;

    throw err;
};