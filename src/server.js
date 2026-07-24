const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running at https://localhost:${PORT} / published URI`);
        });
    } catch(err) {
        console.log(err);
    };
};

startServer();