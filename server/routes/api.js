const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const controller = require("../controllers/apiController");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return done(null, false, { message: "incorrect username" });
    }
    const match= await bcrypt.compare(password,user.password);
    if (!match) {
      return done(null, false, { message: "incorrect password" });
    }
    return done(null, user);
  })
);
passport.serializeUser(async (id, done) => {
  done(null, user, id);
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
router.post('/log-in', 
    passport.authenticate('local', {
        successRedirect: 'http://localhost:5173/posts',
        failureRedirect: 'http://localhost:5173/register'
    })
);
router.get("/", controller.getPosts);

module.exports = router;

//figure out why I cant authenticate user
//use a main.js file to look into my prisma schema manually to check output