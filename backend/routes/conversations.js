const express = require("express");
const {Conversation, getOneUserAllConversation, getTwoUserConversation} = require("../controllers/conversation")
const router = express.Router();


router.route("/conversation").post(Conversation)
router.route("/conversation/:userId").get(getOneUserAllConversation)
router.route("/conversation/find/:firstUserId/:secondUserId").get(getTwoUserConversation)


module.exports = router;
