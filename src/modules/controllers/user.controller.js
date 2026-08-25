const { missingBodyErrHandler } = require("../../handler/errHandlers");
const {
    createUser,
    validateUser,
    getUser,
} = require("../services/user.services");

module.exports.registerUser = async (req, res, next) => {
    try {
        const data = req.body;

        missingBodyErrHandler(data);

        const message = await createUser(data);

        return res.status(201).json({
            success: true,
            status: 200,
            message,
        });
    } catch(err) {
        next(err);
    };
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const body = req.body;

        if (Object.keys(body).length <= 0) {
            const err = new Error("Request body missing");
            err.status = 404;

            throw err;
        };

        const message = await validateUser(body);

        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch(err) {
        next(err);
    };
};

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