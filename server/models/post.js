const mongoose = require("mongoose");
const Comment = require('./comment');
const User = require("./user");

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },

    img: {
        type: String,
  
    },
    like:{
      type: Number

    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }]
  },
  {
    timestamps: true
  }
);


postSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the post from their posts list
    user.posts.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
