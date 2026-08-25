const express = require("express");
const { 
    registerUser,
    loginUser,
    showUser,
} = require("../controllers/user.controller");
const userAuthenticator = require("../../middlewares/authMiddleware");

const router = express.Router();

// user authenticator and authorization
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// for user details
router.get("/user", userAuthenticator, showUser);

module.exports = router;