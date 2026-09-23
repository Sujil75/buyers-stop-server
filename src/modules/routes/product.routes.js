const {AuthMiddleware, RoleMiddleware} = require("../../middlewares");
const BaseRouter = require("../../core/base/BaseRouter");
const ProductController = require("../controllers/product.controller");

class ProductRouter extends BaseRouter {
    constructor(controller, basePath, middlewares = []) {
        super(controller, basePath, [...middlewares, AuthMiddleware]);
        this.setupProductRoutes();
    };

    setupProductRoutes() {
        this.router.post("/", RoleMiddleware("retailer"), this.controller.createProduct);
        this.router.get("/", RoleMiddleware("retailer", "consumer"), this.controller.showProducts);
        this.router.put("/:id", RoleMiddleware("retailer"), this.controller.updateProducts);
        this.router.delete("/:id", RoleMiddleware("retailer"), this.controller.removeProducts);
    };

    setupRoutes() {};
}

module.exports = new ProductRouter(ProductController, ""); // Empty quotes for passing basePaths