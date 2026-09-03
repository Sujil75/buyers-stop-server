const express = require("express");
const userAuthenticator = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");
const { 
    displayAddress,
    addAddress
} = require("../controllers/address.controller");

const router = express.Router();

router.get("/", userAuthenticator, roleMiddleware("retailer", "consumer"), displayAddress);
router.post("/", userAuthenticator, addAddress);

module.exports = router;