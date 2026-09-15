const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/user.model");
const BaseService = require("../../core/base/BaseService");
const {
    InvalidContentError, 
    NotFoundError, 
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
            throw new NotFoundError("No User Data Found")
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
        const admin = await this.model.findOne({
            $or: [
                {username: data.username},
                {email: data.email},
            ]}
        ).select("+password");
        
        if (!admin) throw new InvalidContentError("Invalid email or password, or user doesn't exist");

        const checkPassword = await bcrypt.compare(data.password, admin.password);

        if (!checkPassword) throw new UnauthorizedError("Invalid Password");

        const body = {
            id: admin.id,
            email: admin.email,
            username: admin.username,
            role: admin.user_type,
        }
        
        const token = jwt.sign(
            body, secret, {
                expiresIn: "1d"
            }
        );

        return {
            token: token,
        };
    }
}

module.exports = AuthService;