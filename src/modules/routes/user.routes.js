const express = require("express");
const userAuthenticator = require("../../middlewares/authMiddleware");
const { 
    registerUser,
    loginUser,
} = require("../controllers/logReg.controller");
const { 
    showUser,
    updateUser,
    removeUser,
} = require("../controllers/user.controller");
const roleMiddleware = require("../../middlewares/roleMiddleware");

const router = express.Router();

// for user authenticator and authorization
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// for user details
router.get("/user-profile", userAuthenticator, roleMiddleware("retailer", "consumer"), showUser);
router.get("/user", userAuthenticator, roleMiddleware("creator"), showUser);
router.put("/user", userAuthenticator, updateUser);
router.delete("/user", userAuthenticator, removeUser);

module.exports = router;