const BaseModel = require("../../core/base/BaseModel");

const userSchema = {
    name: {
        type: String,
        trim: true,
    }, 
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please enter valid email format"
        ],
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    user_type: {
        type: String,
        enum: ["consumer", "retailer", "creator"],
        default: "consumer",
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    refresh_token: {
        type: String,
        select: false,
    },
};

const userModel = new BaseModel("User", userSchema);

// schema.index({email: 1}) or in here userModel.addIndex({email: -1}), is for showing the email in .find() method of mongoose to show all the email in ascending order for descending order -1 is to given in place of 1

module.exports = userModel.getModel();