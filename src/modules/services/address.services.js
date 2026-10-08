const BaseService = require("../../core/base/BaseService");
const AddressModel = require("../models/address.model");
const {
    NotFoundError,
} = require("../../core/errors");

class AddressService extends BaseService {
    constructor() {
        super(AddressModel);
    };

    async getAddress(data) {
        const {id} = data;
        const address = await this.model.find({user: id});
        
        if (!address || address.length < 1) throw new NotFoundError("User didn't added any address, please add one");   

        return {
            message: "Successfully fetched address",
            data: address,
        };
    };

    async postAddress(...data) {
        const user = data[0];
        const body = data[1];

        const addressWithUser = {
            user: user.id,
            address_line1: body.address_line1,
            address_line2: body.address_line2,
            city: body.city,
            state: body.state,
            country: body.country,
            pincode: body.pincode,
        }

        await this.create(addressWithUser);

        return {
            message: "Address added successfully",
        };
    };
}

module.exports = AddressService;