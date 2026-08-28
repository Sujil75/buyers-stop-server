const { missingBodyErrHandler, invalidContent } = require("../../handler/errHandlers");
const {
    getUser,
    putUser,
    deleteUser,
} = require("../services/user.services");

module.exports.showUser = async (req, res, next) => {
    try {
        const body = req.user;

        const content = await getUser(body);

        res.status(200).json({
            success: true,
            status: 200,
            message: content.message,
            data: content.data,
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
        const id = await req.params.id;

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