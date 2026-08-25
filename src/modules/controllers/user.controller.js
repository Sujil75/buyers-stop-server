const { missingBodyErrHandler } = require("../../handler/errHandlers");
const {
    getUser,
    putUser,
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