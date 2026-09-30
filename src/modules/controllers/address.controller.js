const BaseController = require("../../core/base/BaseController");
const { 
    BadRequestError,
} = require("../../core/errors");
const { ApiResponse } = require("../../core/utils");
const AddressService = require("../services/address.services");

class AddressController extends BaseController {
    constructor() {
        super(new AddressService());
    };

    displayAddress = this.handleAsync(async (req, res, next) => {
        const user = req.user;

        const content = await this.service.getAddress(user);

        return ApiResponse.ok(content.message, content.data).send(res);
    });

    addAddress = this.handleAsync(async (req, res, next) => {
        const {user, body} = req;

        if (!body || Object.keys(body).length < 1) throw new BadRequestError("Missing user request body");

        const message = await this.service.postAddress(user, body);

        return ApiResponse.ok(message).send(res);
    });
}

module.exports = new AddressController();