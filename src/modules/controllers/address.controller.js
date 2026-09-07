const { 
    asyncHandler
} = require("../../core/utils");
const { missingBodyErrHandler } = require("../../handler/errHandlers");
const { getAddress, postAddress } = require("../services/address.services");

module.exports.displayAddress = asyncHandler(async (req, res, next) => {
    const user = req.user;

    const content = await getAddress(user);

    res.status(200).json({
        success: true,
        status: 200,
        message: content.message,
        data: content.data,
    });
});

module.exports.addAddress = async (req, res, next) => {
    const {user, body} = req;

    missingBodyErrHandler(body, next);

    const message = await postAddress(user, body);

    res.status(201).json({
        success: true,
        status: 201,
        message,
    });
};