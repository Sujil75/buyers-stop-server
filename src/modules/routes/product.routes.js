const express = require("express");
const { 
    addProduct
} = require("../controllers/product.controller");
const userAuthenticator = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post("/product", userAuthenticator, roleMiddleware("retailer"), addProduct);

module.exports = router;