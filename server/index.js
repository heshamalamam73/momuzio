require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require('./routes/messages');
const postsRoutes = require('./routes/posts');

const db = require("./models");
const {ensureCorrectUser, loginRequired}= require('./middleware/auth');
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/users/:id/posts",
  loginRequired,
  ensureCorrectUser,
  postsRoutes
  );

app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
  );
  ///// posts will be her 
  app.get("/api/posts", loginRequired, async function(req, res, next) {
    try {
      let posts = await db.Post.find()
        .sort({ createdAt: "desc" })
        .populate("user", {
          username: true,
          profileImg: true,
          _id:true
        });
      return res.status(200).json(posts);
    } catch (err) {
      return next(err);
    }
  });


  //////////

  
app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImg: true,
        _id:true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});



app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
