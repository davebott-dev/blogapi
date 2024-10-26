const expres = require('express');
const router= express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const controller = require('../controllers/apiController');

router.get('/', controller.getPosts);

module.exports= router;