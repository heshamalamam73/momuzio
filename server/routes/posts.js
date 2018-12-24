const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createPost,
  editPost,
  getPost,
  deletePost
} = require("../handlers/posts");

// prefix - /api/users/:id/posts
router.route("/").post(createPost);

// prefix - /api/users/:id/posts/:post_id

    
router
  .route("/:postId")
  .get(getPost)
  .delete(deletePost)
  .put(editPost)
 

  

           

module.exports = router;

