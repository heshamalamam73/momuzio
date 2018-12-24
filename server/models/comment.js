const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");


const commentSchema = new mongoose.Schema(
  {
    text:{
      type: String,
    },
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    commentName: {
      type: String,
    },
    commentImg: {
      type:String
    }
    ,
    like: {
      type: Number
    }
  
  },
  {
    timestamps: true
  },
 
   
  
);

commentSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the message from their messages list
    user.comments.remove(this.id);

    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
