const BaseModel = require("../../core/base/BaseModel");

const brandSchema = {
    name: {
        type: String,
        trim: true,
    },
    logo: {
        type: String,
        trim: true,
        match: [
            ["']([a-zA-Z0-9-_]*logo[a-zA-Z0-9\-_]*\.(?:png|jpg|jpeg|gif)).*?['"]   ,
            "Please enter valid email format"
        ],
    },
    description: {
        type: String,
        trim: true,
    },
};

const BrandModel = new BaseModel("Brand", brandSchema, {collection: "Brand"});
BrandModel.addIndex({name: 1});

module.exports = BrandModel.getModel();