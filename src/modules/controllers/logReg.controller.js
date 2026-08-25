const { missingBodyErrHandler } = require("../../handler/errHandlers");
const {
    createUser,
    validateUser,
} = require("../services/logReg.services");

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

        missingBodyErrHandler(body);

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