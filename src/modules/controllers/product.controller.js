const { missingBodyErrHandler } = require("../../handler/errHandlers");
const { 
    postProduct,
    getProducts,
    putProducts
} = require("../services/product.services");

module.exports.createProduct = async (req, res, next) => {
    try {
        const body = req.body;
        
        missingBodyErrHandler(body, next);

        const message = await postProduct(body);

        res.status(201).json({
            success: true,
            status: 201,
            message
        });
    } catch (err) {
        next(err);
    };
}

module.exports.showProducts = async (req, res, next) => {
    try {
        const data = await getProducts();

        res.status(200).json({
            success: true,
            status: 200,
            message: data.message,
            data: data.content,
        });
    } catch (err) {
        next(err);
    };
};

module.exports.updateProducts = async (req, res, next) => {
    try {
        const body = req.body;
        const id = req.params.id;
        
        missingBodyErrHandler(body, next);

        const message = await putProducts(body, id);
        
        res.status(200).json({
            success: true,
            status: 200,
            message,
        });
    } catch(err) {
        next(err);
    };
};