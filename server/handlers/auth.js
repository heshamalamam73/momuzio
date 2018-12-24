const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  let user = await db.User.findOne({
    email: req.body.email
  });
  try{
      let {id,username,profileImg } =user;
      let isMatch = await user.comparePassword(req.body.password);
      if(isMatch){
        let token = jwt.sign(
          {
            id,
            username,
            profileImg
          },
          process.env.SECRET_KEY
        ) ;
        return res.status(200).json({
          id,
          username,
          profileImg,
          token
        })
      } else{
        return next({
          status:400,
          message : "invalid Email/password"
        });
      }
  } catch(e) {
    return next({status:400,message : "invalid Email/password"})


  }
}
  

exports.signup = async function(req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImg } = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImg
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImg,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
exports.getUser = async function(req, res ,next) {
  try{
    let user = await db.User.findById(req.params.userId)

    .populate("posts",{
      text:true,
      img:true,
      like:true,
      comments:true,
    })
    .populate("comments",{
      username: true,
      profileImg:true
    })
  
    return res.status(200).json(user);

  }catch(err){
    return next(err);

  }
};
exports.getUsers = async function(req, res ,next) {
  try{
    let users = await db.User.find();
    return res.status(200).json(users);

  }catch(err){
    return next(err);

  }
};
