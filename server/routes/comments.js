const express = require("express");
const router = express.Router({ mergeParams: true });


const {
    createComment,
    getComment,
    deleteComment,
    editComment
  } = require('../handlers/comments');

  router.route('/').post(createComment);


  router
        .route("/:comment_id")
        .get(getComment)
        .delete(deleteComment)
        .put(editComment);

        module.exports = router;