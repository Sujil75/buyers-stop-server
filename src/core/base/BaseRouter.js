const express = require('express');

  class BaseRouter {
    constructor(controller, basePath, middlewares = []) {
      if (!controller) {
        throw new Error('BaseRouter requires a BaseController instance');
      }
      this.controller = controller;
      this.basePath = basePath;
      this.middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
      this.router = express.Router();
      this.middlewares.forEach(middleware => {
        this.router.use(middleware);
      });
      this.setupRoutes();
    }

    setupRoutes() {};

    getRouter() {
      return this.router;
    }

    addRoute(path, method, handler) {
      if (typeof handler !== "function") {
          throw new TypeError(
              `Handler for ${method.toUpperCase()} ${path} must be a function`
          );
      }

      this.router[method.toLowerCase()](path, handler);

      return this;
    }
  }

  module.exports = BaseRouter;
