const { missingBodyErrHandler } = require("../../handler/errHandlers");
const { 
    createProduct
} = require("../services/product.services");

module.exports.addProduct = async (req, res, next) => {
    try {
        const body = req.body;
        
        missingBodyErrHandler(body, next);

        const message = await createProduct(body);

        res.status(201).json({
            success: true,
            status: 201,
            message
        });
    } catch (err) {
        next(err);
    };
}