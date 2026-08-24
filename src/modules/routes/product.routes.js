const express = require("express");
const { 
    createProduct,
    showProducts,
    updateProducts
} = require("../controllers/product.controller");
const userAuthenticator = require("../../middlewares/authMiddleware");
const roleMiddleware = require("../../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", userAuthenticator, roleMiddleware("retailer"), createProduct);
router.get("/", userAuthenticator, roleMiddleware("retailer", "consumer"), showProducts);
router.put("/:id", userAuthenticator, roleMiddleware("retailer"), updateProducts);

module.exports = router;