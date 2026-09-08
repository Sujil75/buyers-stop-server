const express = require('express');

  class BaseRouter {
    constructor(controller, basePath, middlewares = []) {
      if (!controller || !(controller instanceof BaseController)) {
        throw new Error('BaseRouter requires a BaseController instance');
      }
      this.controller = controller;
      this.basePath = basePath;
      this.middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
      this.router = express.Router();
      this.setupRoutes();
    }

    setupRoutes() {
      this.middlewares.forEach(middleware => {
        this.router.use(middleware);
      });

      this.router.get(this.basePath, this.controller.getAll);
      this.router.get(`${this.basePath}/:id`, this.controller.getById);
      this.router.post(this.basePath, this.controller.create);
      this.router.put(`${this.basePath}/:id`, this.controller.updateById);
      this.router.delete(`${this.basePath}/:id`, this.controller.deleteById);
    }

    getRouter() {
      return this.router;
    }

    addRoute(path, method, handler) {
      this.router[method.toLowerCase()](path, handler);
      return this;
    }
  }

  module.exports = BaseRouter;
