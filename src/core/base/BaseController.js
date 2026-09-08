const { ApiResponse, ApiError } = require('../../core/utils');

  class BaseController {
    constructor(service) {
      if (!service || !(service instanceof BaseService)) {
        throw new Error('BaseController requires a BaseService instance');
      }
      this.service = service;
    }

    getAll = (req, res, next) => {
      return this.handleAsync(async () => {
        const result = await this.service.getAll(req.query);
        return ApiResponse.ok('Records fetched successfully', result.data).send(res);
      });
    };

    getById = (req, res, next) => {
      return this.handleAsync(async () => {
        const { id } = req.params;
        const result = await this.service.getById(id);
        return ApiResponse.ok('Record fetched successfully', result.data).send(res);
      });
    };

    create = (req, res, next) => {
      return this.handleAsync(async () => {
        const result = await this.service.create(req.body);
        return ApiResponse.created('Record created successfully', result.data).send(res);
      });
    };

    updateById = (req, res, next) => {
      return this.handleAsync(async () => {
        const { id } = req.params;
        await this.service.updateById(id, req.body);
        return ApiResponse.ok('Record updated successfully').send(res);
      });
    };

    deleteById = (req, res, next) => {
      return this.handleAsync(async () => {
        const { id } = req.params;
        await this.service.deleteById(id);
        return ApiResponse.ok('Record deleted successfully').send(res);
      });
    };

    // Async handler wrapper
    handleAsync(fn) {
      return async (req, res, next) => {
        try {
          await fn(req, res, next);
        } catch (error) {
          next(error);
        }
      };
    }

    // Custom response methods
    successResponse(res, message, data = null, statusCode = 200) {
      return ApiResponse.ok(message, data, null).status(statusCode).send(res);
    }

    errorResponse(res, message, statusCode = 500, details = null) {
      const apiError = ApiError.internal(message, details);
      apiError.statusCode = statusCode;
      return apiError.send(res);
    }
  }

  module.exports = BaseController;