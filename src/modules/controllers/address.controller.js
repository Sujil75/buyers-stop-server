const { getAddress } = require("../services/address.services");

module.exports.displayAddress = async (req, res, next) => {
    try {
        const body = req.user;

        const content = await getAddress(body);

        res.status(200).json({
            success: true,
            status: 200,
            message: content.message,
            data: content.data,
        });
    } catch(err) {
        next(err)
    };
};