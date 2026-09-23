const BaseRouter = require("../../core/base/BaseRouter");
const {AuthMiddleware, RoleMiddleware} = require("../../middlewares");
const { 
    registerUser,
    loginUser,
} = require("../controllers/logReg.controller");
const UserController = require("../controllers/user.controller");

class UserRouter extends BaseRouter {
    constructor(controller, basePath, middlewares = []) {
        super(controller, basePath, middlewares);
        this.setupAuthRoutes();
        this.setupUserRoutes();
    };

    setupAuthRoutes() {
        // for user authenticator and authorization
        this.router.post("/auth/register", registerUser);
        this.router.post("/auth/login", loginUser);
    };

    setupUserRoutes() {
        // for user details
        this.router.get("/user/profile", AuthMiddleware, RoleMiddleware("retailer", "consumer"), this.controller.showUser);
        this.router.get("/user", AuthMiddleware, RoleMiddleware("creator"), this.controller.showUser);
        this.router.put("/user", AuthMiddleware, this.controller.updateUser);
        this.router.delete("/user", AuthMiddleware, this.controller.removeUser);
    };
    
    setupRoutes() {}; // prevents the base router from overriding the unwanted CRUD routes
}

module.exports = new UserRouter(UserController, "");