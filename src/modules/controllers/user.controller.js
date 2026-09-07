const { asyncHandler } = require("../../core/utils");
const { missingBodyErrHandler, invalidContent } = require("../../handler/errHandlers");
const {
    getUserList,
    putUser,
    deleteUser,
    getUserProfile,
} = require("../services/user.services");

module.exports.showUser = asyncHandler(async (req, res, next) => {
    const body = req.user;

    if (body.role === "creator") {
        const userList = await getUserList(body);

        res.status(200).json({
            success: true,
            status: 200,
            message: userList.message,
            data: userList.data,
        });
    };

    const userProfile = await getUserProfile(body);

    res.status(200).json({
        success: true,
        status: 200,
        message: userProfile.message,
        data: userProfile.data,
    });
});

module.exports.updateUser = asyncHandler(async (req, res, next) => {
    const body = req.body;
    const user = req.user;
    
    missingBodyErrHandler(body);

    const message = await putUser(body, user);

    res.status(200).json({
        success: true,
        status: 200,
        message,
    });
});

module.exports.removeUser = asyncHandler(async (req, res, next) => {
    const id = await req.user.id;

    if (!id) invalidContent("Invalid ID found", 404);

    const message = await deleteUser(id);

    res.status(200).json({
        success: true,
        status: 200,
        message,
    });
});