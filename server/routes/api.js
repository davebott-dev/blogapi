require('dotenv').config();
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken'); 
const opts = {};
const bcrypt = require('bcryptjs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads')
  },
});
const upload = multer({storage:storage});
const controller = require("../controllers/apiController");
const flash = require("connect-flash");
router.use(flash());

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';


passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async(jwtPayload,done) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: jwtPayload.userId,
          },
        });
        if(!user) {
          return done(null, false, {msg: "user not found"});
        }
        return done(null,user);
      } catch(err) {
        return done(err, false);
      }
    }
  )
); 

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (!user) {
        return done(null, false, { msg: 'Incorrect username or password' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { msg: 'Incorrect username or password' });
      }
      return done(null, user); 
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => { 
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  done(null, user);
});

router.post('/',controller.createUser);
router.post('/log-in', passport.authenticate("local", {session:false}), (req,res)=> {
  const user = req.user;
  if(!user) {
    return res.status(400).json({
      success:false,
      msg: 'incorrect credentials'
    })
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({
    success:true,
    token,
  })
})

router.get('/',controller.getUser);
router.get('/profile/:userId', controller.getProfile);
router.get('/posts', passport.authenticate('jwt',{session:false}), controller.getPosts);
router.post('/like/:postId',controller.like);
router.post('/delete/:postId',controller.delete);
router.post('/profile/delete/:userId', controller.deleteUser);
router.post('/comment/like/:commentId',controller.likeComment);
router.post('/comment/:postId',controller.comment);
router.post('/profile',upload.single('file'),controller.updateProfile);
router.post('/upload',upload.single('file'),controller.upload);
router.get('/logout', controller.logout);

module.exports = router;

