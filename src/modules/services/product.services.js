const { default: mongoose } = require("mongoose");
const { invalidContent } = require("../../handler/errHandlers");
const Product = require("../models/product.model");

const validateProductId = id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        invalidContent("Invalid Product ID found", 404);
    };
};

module.exports.postProduct = async data => {
    const existingProduct = await Product.findOne({
        product_name: data.product_name,
    });

    if (existingProduct) {
        const message = `Product with name '${existingProduct.product_name}' already exists`;

        invalidContent(message, 409);
    };

    await Product.create(data);

    return "Product created successfully";
};

module.exports.getProducts = async () => {
    const productsList = await Product.find();
    let message = "Data received successfully";

    if (productsList.length === 0) {
        message = "Product list is empty";
    };

    return data = {
        content: productsList,
        message,
    };
};

module.exports.putProducts = async (data, id) => {
    validateProductId(id);

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedProduct) {
        invalidContent("Product not updated successfully", 404);
    };

    return "Product updated successfully";
};


module.exports.deleteProduct = async id => {
    validateProductId(id);

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
        invalidContent("Product not deleted", 404);
    };

    return "Product deleted successfully";
};