const BaseController = require("../../core/base/BaseController");
const { BadRequestError } = require("../../core/errors");
const { ApiResponse } = require("../../core/utils");
const UserService = require("../services/user.services");

class UserController extends BaseController {
    constructor() {
        super(new UserService());
    };

    showUser =  this.handleAsync(async (req, res, next) => {
        const body = req.user;

        if (body.role === "creator") {
            const userList = await this.service.getUserList();
            return ApiResponse.ok(userList.message, userList.data).send(res);
        };

        const userProfile = await this.service.getUserProfile(body);
        return ApiResponse.ok(userProfile.message, userProfile.data).send(res);
    });

    updateUser = this.handleAsync(async (req, res, next) => {
        const body = req.body;
        const user = req.user;
        
        if (!body || Object.keys(body).length < 1) throw new BadRequestError("Missing request body");

        const message = await this.service.putUser(body, user);
        return ApiResponse.ok(message).send(res);
    });

    removeUser = this.handleAsync(async (req, res, next) => {
        const id = req.user.id;

        if (!id) throw new BadRequestError("Invalid ID found");

        const message = await this.service.deleteUser(id);
        return ApiResponse.ok(message).send(res);
    });
}

module.exports = new UserController();