const bcrypt = require("bcrypt");

const provideInvalidData = data => {
    const {email, username, password} = data;

    if (!email) {
        const err = new Error("Please enter an email");
        err.status = 400;

        throw err;
    };

    if (!username) {
        const err = new Error("Please enter a username");
        err.status = 400;

        throw err;
    };

    if (!password) {
        const err = new Error("Please enter a password");
        err.status = 400;

        throw err;
    };
};

const createUser = async data => {
    if (!data) {
        const err = new Error("No User Data Found");
        err.status = 400;

        throw err;
    };

    provideInvalidData(data);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    console.log(hashedPassword);
};

module.exports = {
    createUser,
};