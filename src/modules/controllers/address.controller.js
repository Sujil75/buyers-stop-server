const BaseController = require("../../core/base/BaseController");
const { InvalidContentError } = require("../../core/errors");
const { ApiResponse } = require("../../core/utils");
const AddressService = require("../services/address.services");

class AddressController extends BaseController {
    constructor() {
        super(new AddressService());
    };

    displayAddress = (req, res, next) => {
        return this.handleAsync(async () => {
            const user = req.user;

            const content = this.service.getAddress(user);

            if (!content) throw new NotFoundError("No data to display");

            return ApiResponse.ok(content.message, content.data).send(res);
        });
    };

    addAddress = (req, res, next) => {
        return this.handleAsync(async () => {
            const {user, body} = req;

            if (!body || Object.keys(body).length < 1) throw new InvalidContentError("Missing user request body");

            const message = this.service.postAddress(user, body);

            return ApiResponse.ok(message).send(res);
        });
    };
}

module.exports = new AddressController();