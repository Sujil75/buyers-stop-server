const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const BaseService = require("../../core/base/BaseService");
const { InvalidContentError } = require("../../core/errors");

class UserService extends BaseService {
    constructor() {
        super(UserModel);
    };

    async getUserList(data) {
        const {id} = data;
    
        const userExists = await this.model.findById(id);

        if (!userExists) {
            throw new InvalidContentError("User does not exist", 404);
        };

        const user = await this.model.find(); // password will not be shown

        if (!user || user.length === 0) {
            throw new InvalidContentError("No users added yet", 404);
        };

        return {
            data: user,
            message: "Successfully fetched all user details",
        };
    };

    async getUserProfile(data) {
        const {id} = data;
        
        const userExists = await this.model.findById(id);

        if (!userExists) {
            throw new InvalidContentError("User does not exist", 404);
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
                throw new InvalidContentError("Provide a new_password", 400); 
            };

            if (!content.old_password) {
                throw new InvalidContentError("Provide the old_password", 400); 
            };

            const adminPassword = (await this.model.findById(user.id).select("+password"))?.password;

            const isValidPassword = await bcrypt.compare(
                content.old_password, 
                adminPassword
            );

            if (!isValidPassword) {
                throw new InvalidContentError("Invalid Old Password", 401); 
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
            throw new InvalidContentError("User not updated successfully", 404);
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
            throw new InvalidContentError("User not found", 404);
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