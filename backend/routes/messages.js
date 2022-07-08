const express = require("express");
const { usersMessage, getMessagesLikeConversation } = require("../controllers/messages");
const router = express.Router();


router.route("/message").post(usersMessage)
router.route("/message/:conversationId").get(getMessagesLikeConversation)




module.exports = router;