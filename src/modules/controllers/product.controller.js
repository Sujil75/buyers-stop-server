const BaseController = require("../../core/base/BaseController");
const { InvalidContentError } = require("../../core/errors");
const { ApiResponse } = require("../../core/utils");
const ProductService = require("../services/product.services");

class ProductController extends BaseController {
    constructor() {
        super(new ProductService());
    };

    createProduct = this.handleAsync(async (req, res, next) => {
        const body = req.body;
        
        if (!body || Object.keys(body).length < 1) throw new InvalidContentError("Missing request body");

        const message = await this.service.postProduct(body);
        return ApiResponse.ok(message).send(res);
    });

    showProducts = this.handleAsync(async (req, res, next) => {
        const data = await this.service.getProducts();
        return ApiResponse.ok(data.message, data.content).send(res);
    });

    updateProducts = this.handleAsync(async (req, res, next) => {
        const body = req.body;
        const id = req.params.id;
        
        if (!body || Object.keys(body).length < 1) throw new InvalidContentError("Missing request body");

        const message = await this.service.putProducts(body, id);
        return ApiResponse.ok(message).send(res);
    });

    removeProducts = this.handleAsync(async (req, res, next) => {
        const id = req.params.id;

        const message = await this.service.deleteProduct(id);
        return ApiResponse.ok(message).send(res);
    });
}

module.exports = new ProductController();