const mongoose = require("mongoose");

class BaseModel {
    constructor(modelName, schemaDefinition, options = {}) {
        this.modelName = modelName;
        const schemaOptions = {
            timestamps: true,
            ...options,
        };
        this.schema = new mongoose.Schema(schemaDefinition, schemaOptions);
        this.model = mongoose.model(modelName, this.schema);
    };

    addIndex(fields, options = {}) {
        this.schema.index(fields, options);
        return this;
    };

    addVirtual(virtualName, options) {
        this.schema.virtual(virtualName, options);
        return this;
    };

    async find(query = {}, projection = null) {
        return this.model.find(query, projection);
    };
    
    async findById(id, projection = null) {
        return this.model.findById(id, projection);
    };

    async findOne(query = {}, projection = mull) {
        return this.model.findOne(query, projection);
    };

    async create(data) {
        return this.model.create(data);
    };

    async updateById(id, updatedData, options = {}) {
        return this.model.updateById(id, updatedData, options);
    };

    async deleteById(id) {
        return this.model.findByIdAndDelete(id);
    };

    async countDocument(query = {}) {
        return this.model.countDocuments(query);
    };

    getModel() {
        return this.model;
    };

    getSchema() {
        return this.schema;
    };
}

module.exports = BaseModel;