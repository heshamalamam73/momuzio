const db = require("../models");




exports.createComment = async function(req, res, next) {
    try {
      let comment = await db.Comment.create({
        text: req.body.text,
        user: req.body.user,
        commentName: req.body.commentName,
        commentImg: req.body.commentImg,
        like:req.body.like
      
      });
      let foundPost= await db.Post.findById(req.params.id)
      foundPost.comments.push(comment)
      foundPost.save()
      let foundUser = await db.User.findById(req.body.user)
      foundUser.comments.push(comment)
      foundUser.save()
  
      return res.status(200).json(comment)
    
    } catch (err) {
      return next(err);
    }
  };
  exports.getComment = async function(req, res ,next) {
    try{
      let comment = await db.Comment.findById(req.params.id)
      .populate("user",{
        username: true,
        profileImg: true
      })
   
      return res.status(200).json(comment);
  
    }catch(err){
      return next(err);
  
    }
  };
  exports.editComment = async function(req,res, next ){
    try{
      let foundComment = await db.Comment.findByIdAndUpdate(req.params.comment_id,{
        text: req.body.text,
        like: req.body.like
      })
      return res.status(200).json(foundComment)

    }catch(err){
      return next(err);

    }
  }

  exports.deleteComment = async function(req, res, next){
    try{
      let foundComment = await db.Comment.findById(req.params.comment_id);
      await foundComment.remove();
      return res.status(200).json(foundComment);
  
    }catch(err) {
      return next(err);
  
    }
  };