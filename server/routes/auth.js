const express = require("express");
const router = express.Router();
const { signup, signin,getUser,getUsers } = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);



router.get('/',getUsers)
router.get('/:userId',getUser)

module.exports = router;