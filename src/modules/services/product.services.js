const { duplicateContent } = require("../../handler/errHandlers");
const Product = require("../models/product.model");

module.exports.createProduct = async data => {
    const existingProduct = await Product.findOne({
        product_name: data.product_name,
    });

    if (existingProduct) {
        const message = `Product with name '${existingProduct.product_name}' already exists`;

        duplicateContent(message);
    };

    await Product.create(data);

    return "Product created successfully";
};