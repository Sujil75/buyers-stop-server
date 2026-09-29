const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/user.model");
const BaseService = require("../../core/base/BaseService");
const {
    UnauthorizedError, 
    ConflictError,
    BadRequestError
} = require("../../core/errors");

const provideInvalidData = data => {
    const {email, username, password, user_type} = data;

    if (!email) throw new BadRequestError("Please enter an email")

    if (!username) throw new BadRequestError("Please enter a username")

    if (!password) throw new BadRequestError("Please enter a password")

    if (!user_type) throw new BadRequestError("Please enter a valid user type")
};

class AuthService extends BaseService {
    constructor() {
        super(new UserModel())
    };

    secret = process.env.JWT_SECRET;

    async createUser(data) {
        if (!data) {
            throw new BadRequestError("No User Data Found")
        };

        provideInvalidData(data);

        const existingUser = await this.model.findOne({
            $or: [
                {username: data.username},
                {email: data.email},
            ],
        });

        if (existingUser) {
            const message = existingUser.email === data.email 
                ? "Email already taken"
                : "Username already taken"
            
            throw new ConflictError(message)
        };

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const updatedData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            user_type: data.user_type,
            username: data.username,
        };
        
        await this.model.create(updatedData);

        return {
            message: "User created successfully",
        };
    }

    async validateUser(data) {
        const user = await this.model.findOne({
            $or: [
                {username: data.username},
                {email: data.email},
            ]}
        ).select("+password");
        
        if (!user) throw new UnauthorizedError("Invalid credentials");

        const checkPassword = await bcrypt.compare(
            data.password,
            user.password,
        );

        if (!checkPassword) throw new UnauthorizedError("Invalid credentials");

        const body = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.user_type,
        }
        
        const token = jwt.sign(
            body, this.secret, {
                expiresIn: "1d"
            }
        );

        return {
            token: token,
        };
    }
}

module.exports = AuthService;