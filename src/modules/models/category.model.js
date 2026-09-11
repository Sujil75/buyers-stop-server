const BaseModel = require("../../core/base/BaseModel");

const categorySchema = {
    name: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter valid email format"
        ],
    },
    description: {
        type: String,
        trim: true,
    }
};

const CategoryModel = new BaseModel("Category", categorySchema);
CategoryModel.addIndex({name: 1});

module.exports = CategoryModel.getModel()