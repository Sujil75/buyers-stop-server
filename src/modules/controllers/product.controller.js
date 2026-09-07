const { asyncHandler } = require("../../core/utils");
const { missingBodyErrHandler } = require("../../handler/errHandlers");
const { 
    postProduct,
    getProducts,
    putProducts,
    deleteProduct
} = require("../services/product.services");

module.exports.createProduct = asyncHandler(async (req, res, next) => {
    const body = req.body;
        
    missingBodyErrHandler(body, next);

    const message = await postProduct(body);

    res.status(201).json({
        success: true,
        status: 201,
        message
    });
});

module.exports.showProducts = asyncHandler(async (req, res, next) => {
    const data = await getProducts();

    res.status(200).json({
        success: true,
        status: 200,
        message: data.message,
        data: data.content,
    });
});

module.exports.updateProducts = asyncHandler(async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    
    missingBodyErrHandler(body, next);

    const message = await putProducts(body, id);
    
    res.status(200).json({
        success: true,
        status: 200,
        message,
    });
});

module.exports.removeProducts = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const message = await deleteProduct(id);

    res.status(200).json({
        success: true,
        status: 200,
        message,
    });
});