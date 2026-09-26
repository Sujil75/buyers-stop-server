const BaseRouter = require("../../core/base/BaseRouter");
const {AuthMiddleware, RoleMiddleware} = require("../../middlewares");
const AddressController = require("../controllers/address.controller");

class AddressRouter extends BaseRouter {
    constructor(controller, basePath, middlewares = []) {
        super(controller, basePath, [...middlewares, AuthMiddleware]);
        this.setupAddressRoutes();
    };

    setupAddressRoutes() {
        this.router.get("/", RoleMiddleware("retailer", "consumer"), this.controller.displayAddress);
        this.router.post("/", this.controller.addAddress);
    };

    setupRoutes() {};
}

module.exports = new AddressRouter(AddressController);