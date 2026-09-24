const mongoose = require("mongoose");
const { DatabaseConnectionError } = require("../errors");
require("dotenv").config();

class Database {
    constructor() {
        this.MONGO_URI = process.env.MONGO_URI;
        this.isConnected = false;
        this.connectionPromise = null;
    };

    async connect() {
        if (this.isConnected) return mongoose.connection;

        if (!this.connectionPromise) {
            this.connectionPromise = this._connect();
        };

        return this.connectionPromise;
    };

    async _connect() {
        try {
            await mongoose.connect(this.MONGO_URI);
            this.isConnected = true;

            mongoose.connection.on('connected', () => {
                console.log("MongoDB connected successfully");
            });

            mongoose.connection.on('error', (err) => {
                console.error("MongoDB connection error: ", err);
                this.isConnected = false;
            });

            mongoose.connection.on('disconnected', () => {
                console.log("MongoDB disconnected");
                this.isConnected = false;
            });

            return mongoose.connection;
        } catch(error) {
            this.isConnected = false;
            throw new DatabaseConnectionError(`Database connection failed: ${error.message}`);
        };
    };

    async disconnect() {
        if (this.isConnected) {
            await mongoose.disconnect();
            this.isConnected = false;
        };
    };
    
    getConnection() {
        return mongoose.connection;
    };
}

module.exports = new Database();