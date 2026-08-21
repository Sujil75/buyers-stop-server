module.exports.missingBodyErrHandler = (data, next) => {
    let err;

    if (!data) {
        err = new Error("No content body found");
        err.status = 400;

        next(err);
    };

    if (Object.keys(data).length <= 0) {
        err = new Error("Content body data missing");
        err.status = 400;

        next(err);
    };
};

module.exports.duplicateContent = msg => {
    const err = new Error(msg);
    err.status = 409;

    throw err;
};