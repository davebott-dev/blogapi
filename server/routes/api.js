const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload =multer();
const controller = require("../controllers/apiController");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try{
      const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return done(null, false, { msg: "incorrect username" });
    }
    const match= await bcrypt.compare(password,user.password);
    if (!match) {
      return done(null, false, { msg: "incorrect password" });
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
          console.log('success');
          res.redirect('http://localhost:5173/posts');
        };
      });
    }else {
      console.log(info.msg);
      res.redirect('http://localhost:5173/login');
    };
}) (req,res)
}
);
router.get('/',controller.getUser);
router.post('/upload',upload.single('file'),controller.upload);
router.get('/logout', controller.logout);

module.exports = router;

//figure out how to display error message