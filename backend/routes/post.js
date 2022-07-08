const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, deleteComment, createBuddyRequest, createHostRequest, getAllBuddies, getAllHosts } = require("../controllers/post");
const { commentOnPost } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/host/request/:id").post(isAuthenticated,  createHostRequest);

router.route("/buddy/request/:id").post(isAuthenticated, createBuddyRequest);


router.route("/post/:id")
.get(isAuthenticated, likeAndUnlikePost)
.put(isAuthenticated,updateCaption)
.delete(isAuthenticated, deletePost)

router.route("/posts").get(isAuthenticated, getPostOfFollowing)

router
  .route("/post/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);



module.exports = router; 