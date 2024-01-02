const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
const { register, login } = require("../Controllers/User");
const { PostStudyData, GetStudyData } = require("../Controllers/StudyVisits");
// importing the middle ware
const authMiddleware = require("../MiddleWare/auth");
// this is the routes of the application
router.post("/register", register);
router.post("/login", login);
// creating the posty api for posting all the data of visits and study table to that mongo db.
// Corrected route definition
router.post("/allstudydata", authMiddleware, PostStudyData);
// this will fetch all the data based on login user
router.get("/allstudydata", authMiddleware, GetStudyData);

module.exports = router;
