const { missingBodyErrHandler, invalidContent } = require("../../handler/errHandlers");
const {
    getUserList,
    putUser,
    deleteUser,
    getUserProfile,
} = require("../services/user.services");

module.exports.showUser = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    };
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const body = req.body;
        const user = req.user;
        
        missingBodyErrHandler(body);

        const message = await putUser(body, user);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch (err) {
        next(err);
    };
};

module.exports.removeUser = async (req, res, next) => {
    try {
        const id = await req.user.id;

        if (!id) invalidContent("Invalid ID found", 404);

        const message = await deleteUser(id);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch(err) {
        next(err);
    };
};