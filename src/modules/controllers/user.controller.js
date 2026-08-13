const {
    createUser,
} = require("../services/user.services");

const registerUser = async (req, res, next) => {
    try {
        const data = req.body;

        if (Object.keys(data).length === 0) {
            const err = new Error("Request body missing");
            err.status = 404;

            throw err;
        };

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

module.exports = {
    registerUser,
};