const BaseRouter = require("../../core/base/BaseRouter");
const userAuthenticator = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");
const { 
    registerUser,
    loginUser,
} = require("../controllers/logReg.controller");
const UserController = require("../controllers/user.controller");

class UserRouter extends BaseRouter {
    constructor(controller, basePath, middlewares = []) {
        super(controller, basePath, middlewares);
        this.controller = controller;
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
        this.router.get("/user/profile", userAuthenticator, roleMiddleware("retailer", "consumer"), this.controller.showUser);
        this.router.get("/user", userAuthenticator, roleMiddleware("creator"), this.controller.showUser);
        this.router.put("/user", userAuthenticator, this.controller.updateUser);
        this.router.delete("/user", userAuthenticator, this.controller.removeUser);
    };
    
    setupRoutes() {}; // prevents the base router from overriding the unwanted CRUD routes
}

module.exports = new UserRouter(UserController);