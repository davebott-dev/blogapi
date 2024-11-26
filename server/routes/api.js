const express = require("express");
const passport = require("passport");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const controller = require("../controllers/apiController");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
});
const upload = multer({ storage: storage });

passport.use(new JwtStrategy (opts, async (jwtPayload, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: jwtPayload.userId,
      },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { msg: "user not found" });
    }
  } catch (err) {
    return done(err, false);
  }
}));

router.post("/", controller.createUser);
router.post("/log-in", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try{
  const user = await prisma.user.findFirst({
     where: {
       username, 
      }, 
    }); 
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          msg: "Incorrect password",
        });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        success: true,
        token,
      });
  
    } catch(err) {
      console.error(err);
      res.status(500).json({success:false, msg: "server error"});
    }
});

router.get("/", passport.authenticate('jwt', {session:false}), controller.getUser);
router.get("/profile/:userId",passport.authenticate('jwt', {session:false}), controller.getProfile);
router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  controller.getPosts
);
router.post("/like/:postId",passport.authenticate('jwt', {session:false}), controller.like);
router.post("/delete/:postId", passport.authenticate('jwt', {session:false}),controller.delete);
router.post("/profile/delete/:userId", passport.authenticate('jwt', {session:false}),controller.deleteUser);
router.post("/comment/like/:commentId",passport.authenticate('jwt', {session:false}), controller.likeComment);
router.post("/comment/:postId", passport.authenticate('jwt', {session:false}),controller.comment);
router.post("/profile/:userId",passport.authenticate('jwt', {session:false}), upload.single("file"), controller.updateProfile);
router.post("/upload",passport.authenticate('jwt', {session:false}), upload.single("file"), controller.upload);

module.exports = router;
