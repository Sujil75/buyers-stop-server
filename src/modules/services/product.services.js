const mongoose = require("mongoose");
const { InvalidContentError, ConflictError } = require("../../core/errors");
const ProductModel = require("../models/product.model");
const BaseService = require("../../core/base/BaseService");

class ProductService extends BaseService {
    constructor() {
        super(new ProductModel());
    };

    async postProduct(data) {
        const existingProduct = await this.model.findOne({
            product_name: data.product_name,
        });

        if (existingProduct) {
            const message = `Product with name '${existingProduct.product_name}' already exists`;

            throw new ConflictError(message);
        };

        await this.model.create(data);

        return {message: "Product created successfully"};
    };

    async getProducts() {
        const productsList = await this.model.find();
        let message = "Data received successfully";

        if (productsList.length === 0) {
            message = "Product list is empty";
        };

        return {
            content: productsList,
            message: message,
        };
    };

    async putProducts(data, id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new InvalidContentError("Invalid Product ID found");
        };

        const updated = await this.model.updateById(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updated) {
            throw new InvalidContentError("Product not updated successfully");
        };

        return {
            message: "Product updated successfully"
        };
    };


    async deleteProduct(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new InvalidContentError("Invalid Product ID found");
        };

        const deleted = await this.model.deleteById(id);

        if (!deleted) {
            throw new InvalidContentError("Product not deleted");
        };

        return {
            message: "Product deleted successfully",
        };
    };
}

module.exports = ProductService;