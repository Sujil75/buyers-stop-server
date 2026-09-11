const {InvalidContentError} = require("../errors");

class BaseService {
    constructor(model) {
      if (!model || !(model instanceof BaseModel)) {
        throw new Error('BaseService requires a BaseModel instance');
      }
      this.model = model;
    }

    async getAll(query = {}, projection = null) {
      const data = await this.model.find(query, projection);
      if (!data || data.length === 0) {
        throw new InvalidContentError('No records found', 404);
      }
      return { data, message: 'Successfully fetched all records' };
    }

    async getById(id, projection = null) {
      const data = await this.model.findById(id, projection);
      if (!data) {
        throw new InvalidContentError('Record not found', 404);
      }
      return { data, message: 'Successfully fetched record' };
    }

    async create(data) {
      const existing = await this.model.findOne(data); 
      if (existing) {
        throw new InvalidContentError('Record already exists', 409);
      }
      const created = await this.model.create(data);
      return { data: created, message: 'Successfully created record' };
    }

    async updateById(id, updateData, options = {}) {
      const updated = await this.model.updateById(id, updateData, options);
      if (!updated) {
        throw new InvalidContentError('Record not updated successfully', 404);
      }
      return { message: 'Successfully updated record' };
    }

    async deleteById(id) {
      const deleted = await this.model.deleteById(id);
      if (!deleted) {
        throw new InvalidContentError('Record not deleted successfully', 404);
      }
      return { message: 'Successfully deleted record' };
    }

    validateRequiredFields(data, requiredFields) {
      const missing = requiredFields.filter(field => !data[field]);
      if (missing.length > 0) {
        throw new InvalidContentError(`Missing required fields: ${missing.join(', ')}`, 400);
      }
    }
  }

module.exports = BaseService;