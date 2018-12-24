const db = require("../models");

exports.createPost = async function(req, res, next) {
  try {
    let post = await db.Post.create({
      text: req.body.text,
      user: req.params.id,
      img: req.body.img,
      like: req.body.like
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();
    
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
};


exports.getPost = async function(req, res ,next) {
  try{
    let post = await db.Post.findById(req.params.postId)
  
    .populate('comments',{
      text:true,
      user:true,
      commentName: true,
      commentImg : true
    })
    .populate('user',{
      username:true,
      profileImg:true
    })
    return res.status(200).json(post);

  }catch(err){
    return next(err);

  }
};
 exports.editPost = async function(req, res, next){
   try {
    let foundPost = await db.Post.findByIdAndUpdate(req.params.postId,{
      text: req.body.text,
      img: req.body.img,
      like: req.body.like
    })
    return res.status(200).json(foundPost);
   }catch(err){
     return next(err);
   }
 }


exports.deletePost = async function(req, res, next){
  try{
    let foundPost = await db.Post.findById(req.params.postId);
    await foundPost.remove();
    return res.status(200).json(foundPost);

  }catch(err) {
    return next(err);

  }
};
