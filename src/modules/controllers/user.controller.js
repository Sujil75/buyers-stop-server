const BaseController = require("../../core/base/BaseController");
const { InvalidContentError } = require("../../core/errors");
const { ApiResponse } = require("../../core/utils");
const UserService = require("../services/user.services");

class UserController extends BaseController {
    constructor() {
        super(new UserService());
    };

    showUser = (req, res, next) => {
        return this.handleAsync(async () => {
            const body = req.user;

            if (body.role === "creator") {
                const userList = await this.service.getUserList(/* body */);
                return ApiResponse.ok(userList.message, userList.data).send(res);
            };

            const userProfile = await this.service.getUserProfile(body);
            return ApiResponse.ok(userProfile.message, userProfile.data).send(res);
        });
    };

    updateUser = (req, res, next) => {
        return this.handleAsync(async () => {
            const body = req.body;
            const user = req.user;
            
            if (!body || Object.keys(body).length < 1) throw new InvalidContentError("Missing request body", 400);

            const message = await this.service.putUser(body, user);
            return ApiResponse.ok(message).send(res);
        });
    };

    removeUser = (req, res, next) => {
        return this.handleAsync(async () => {
            const id = await req.user.id;

            if (!id) throw new InvalidContentError("Invalid ID found", 404);

            const message = await this.service.deleteUser(id);
            return ApiResponse.ok(message).send(res);
        });
    };
}

module.exports = new UserController();