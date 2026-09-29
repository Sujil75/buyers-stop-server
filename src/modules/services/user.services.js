const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const BaseService = require("../../core/base/BaseService");
const { 
    BadRequestError,
    NotFoundError,
    UnauthorizedError
 } = require("../../core/errors");

class UserService extends BaseService {
    constructor() {
        super(UserModel);
    };

    async getUserList(/* data */) {
        // const {id} = data;
    
        // const userExists = await this.model.findById(id);

        // if (!userExists) {
        //     throw new InvalidContentError("User does not exist", 404);
        // };

        const user = await this.model.find(); // password will not be shown

        if (!user || user.length === 0) {
            throw new NotFoundError("No users added yet");
        };

        return {
            data: user,
            message: "Successfully fetched user list",
        };
    };

    async getUserProfile(data) {
        const {id} = data;
        
        const userExists = await this.model.findById(id);

        if (!userExists) {
            throw new NotFoundError("User does not exist");
        };
        
        return {
            data: userExists,
            message: "Successfully fetched user details",
        };
    };

    async putUser(...data) {
        const content = data[0];
        const user = data[1];

        if (content.new_password || content.old_password) {
            if (!content.new_password) {
                throw new BadRequestError("Provide a new_password");
            };

            if (!content.old_password) {
                throw new BadRequestError("Provide the old_password"); 
            };

            const adminPassword = (await this.model.findById(user.id).select("+password"))?.password;

            const isValidPassword = await bcrypt.compare(
                content.old_password, 
                adminPassword
            );

            if (!isValidPassword) {
                throw new UnauthorizedError("Invalid Old Password"); 
            };
            
            const newHashedPassword = await bcrypt.hash(content.new_password, 10);
            
            delete content.old_password;
            delete content.new_password;
            content.password = newHashedPassword;
        };

        const body = await this.updateById(
            user.id,
            content,
            {
                new: true,
                runValidators: true,
            },
        );

        if (!body) {
            throw new NotFoundError("User not updated successfully");
        };

        return {
            message: "Data updated successfully",
        };
    };

    /*
    * TODO:
    * - Add removing the authentication when user deletes account himself
    */

    async deleteUser(id) {
        const user = await this.model.findById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        };

        await this.model.findByIdAndUpdate(
            id,
            {
                $unset: {
                    refresh_token: 1,
                },
            },
            {
                new: true,
            },
        );

        await this.deleteById(id);

        return {
            message: "User removed successfully",
        };
    };
}

module.exports = UserService;