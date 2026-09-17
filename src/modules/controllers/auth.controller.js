const BaseController = require("../../core/base/BaseController");
const { InvalidContentError } = require("../../core/errors");
const { ApiResponse } = require("../../core/utils");
const AuthService = require("../services/auth.services");

class AuthController extends BaseController {
    constructor() {
        super(new AuthService());
    };

    registerUser = this.handleAsync(async (req, res, next) => {
        const data = req.body;

        if (!data || Object.keys(data).length < 1) throw new InvalidContentError("Missing request body")

        const message = await this.service.createUser(data);

        return ApiResponse.ok(message).send(res);
    });

    loginUser = this.handleAsync(async (req, res, next) => {
        const body = req.body;

        if (!body || Object.keys(body).length < 1) throw new InvalidContentError("Missing request body")

        const message = await this.service.validateUser(body);

        return ApiResponse.ok(message).send(res);
    });
}

module.exports = new AuthController();