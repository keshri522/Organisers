const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
const { register, login } = require("../Controllers/User");
// this is the routes of the application
router.post("/register", register);
router.post("/login", login);
module.exports = router;
