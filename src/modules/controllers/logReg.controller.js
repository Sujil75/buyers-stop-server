const { asyncHandler } = require("../../core/utils");
const { missingBodyErrHandler } = require("../../handler/errHandlers");
const {
    createUser,
    validateUser,
} = require("../services/logReg.services");

module.exports.registerUser = asyncHandler(async (req, res, next) => {
    const data = req.body;

    missingBodyErrHandler(data);

    const message = await createUser(data);

    return res.status(201).json({
        success: true,
        status: 200,
        message,
    });
});

module.exports.loginUser = asyncHandler(async (req, res, next) => {
     const body = req.body;

    missingBodyErrHandler(body);

    const message = await validateUser(body);

    res.status(200).json({
        success: true,
        status: 200,
        message,
    });
});