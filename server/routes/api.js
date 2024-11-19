require('dotenv').config();
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try{
      const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return done(null,false, {msg:'Incorrect username or password'});
    }
    const match= await bcrypt.compare(password,user.password);
    if (!match) {
      return done(null,false, {msg:'Incorrect username or password'});
    }
    return done(null, user)
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
router.use(
  session({ secret: "ilovemorgan", resave: false, saveUninitialized: false })
);
router.use(passport.session());

router.post('/',controller.createUser);
router.post('/log-in', (req,res) => {
  passport.authenticate('local', (err,user,info) => {
    if(user) {
      req.login(user, (error) => {
        if(error) {
          res.send(error);
        } else {
          req.flash('success','Login successful');
          res.redirect('http://localhost:5173/posts');
        };
      });
    }else {
      req.flash('msg', 'invalid credentials');
      console.log(req.session)
      router.get('/log-in-fail', (req,res)=> {
        res.json(req.session)
      });
      res.redirect('/login');
    };
}) (req,res)
});

router.get('/',controller.getUser);
router.get('/profile/:userId', controller.getProfile);
router.get('/posts', controller.getPosts);
router.post('/like/:postId',controller.like);
router.post('/delete/:postId',controller.delete);
router.post('/profile/delete/:userId', controller.deleteUser);
router.post('/comment/like/:commentId',controller.likeComment);
router.post('/comment/:postId',controller.comment);
router.post('/profile',upload.single('file'),controller.updateProfile);
router.post('/upload',upload.single('file'),controller.upload);
router.get('/logout', controller.logout);

module.exports = router;

//install passport-jwt and configure the strategy 
//create a git branch when testing 