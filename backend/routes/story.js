const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {createStory, getStoryOfFollowing} = require("../controllers/story")

const router = express.Router();

router.route("/story/upload").post(isAuthenticated,createStory);

router.route("/stories").get(isAuthenticated,getStoryOfFollowing)

module.exports = router; 
