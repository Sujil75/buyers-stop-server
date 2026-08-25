const express = require("express");
const userAuthenticator = require("../../middlewares/authMiddleware");
const { 
    registerUser,
    loginUser,
} = require("../controllers/logReg.controller");
const { 
    showUser,
    updateUser,
} = require("../controllers/user.controller");

const router = express.Router();

// for user authenticator and authorization
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// for user details
router.get("/user", userAuthenticator, showUser);
router.put("/user", userAuthenticator, updateUser);

module.exports = router;