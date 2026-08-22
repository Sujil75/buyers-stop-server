const express = require("express");
const { 
    addProduct
} = require("../controllers/product.controller");
const userAuthenticator = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post("/product", userAuthenticator, roleMiddleware("retailer"), addProduct);
router.get("/product", userAuthenticator, roleMiddleware("retailer, consumer"))

module.exports = router;