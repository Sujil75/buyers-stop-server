const app = require("./app");
const dbConnection = require("./config/dbConnection");
require("dotenv").config();
const dns = require('dns');

const DNS_PORT = process.env.DNS_PORT.split(",").map(s => s.trim());
dns.setServers(DNS_PORT);

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await dbConnection()

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT} / published URI`);
        });
    } catch(err) {
        console.log(err);
    };
};

startServer();