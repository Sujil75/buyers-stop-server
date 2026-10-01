const {
  BadRequestError, 
  NotFoundError,
} = require("../errors");

class BaseService {
    constructor(model) {
      if (!model) {
        throw new Error('BaseService requires a BaseModel instance');
      }
      this.model = model;
    }

    async getAll(query = {}, projection = null) {
      const data = await this.model.find(query, projection);
      if (!data || data.length === 0) {
        throw new NotFoundError('No records found');
      }
      return { data, message: 'Successfully fetched all records' };
    }

    async getById(id, projection = null) {
      const data = await this.model.findById(id, projection);
      if (!data) {
        throw new NotFoundError('Record not found');
      }
      return { data, message: 'Successfully fetched record' };
    }

    async create(data) {
      const created = await this.model.create(data);

      return { 
        data: created, 
        message: 'Successfully created record' 
      };
    }

    async updateById(id, updateData, options = {}) {
      const updated = await this.model.updateById(id, updateData, options);
      if (!updated) {
        throw new NotFoundError('Record not found');
      }
      return { message: 'Successfully updated record' };
    }

    async deleteById(id) {
      const deleted = await this.model.deleteById(id);
      if (!deleted) {
        throw new NotFoundError('Record not found');
      }
      return { 
        message: 'Successfully deleted record' 
      };
    }

    validateRequiredFields(data, requiredFields) {
      const missing = requiredFields.filter(
        field => 
          data?.[field] === undefined ||
          data?.[field] === null ||
          data?.[field] === ""
      );
      if (missing.length > 0) {
        throw new BadRequestError(`Missing required fields: ${missing.join(', ')}`);
      }
    }
  }

module.exports = BaseService;