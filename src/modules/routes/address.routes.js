const express = require("express");
const userAuthenticator = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");
const { 
    displayAddress
} = require("../controllers/address.controller");

const router = express.Router();

router.get("/user-address", userAuthenticator, roleMiddleware("retailer", "consumer"), displayAddress);

module.exports = router;