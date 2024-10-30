const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

module.exports= {
    getPosts: async(req,res) => {
        res.send("hello world");
    },
    getUser: async(req,res) => {
        const user = req.user;
        res.json(user)
    },
    createUser: async(req,res)=> {
        const username = req.body.username;
        const prev= req.body.password;
        const name = req.body.name;
        const email= req.body.email;

        bcrypt.hash(prev,10,async(err,password)=> {
            if(err) {
                console.error(err);
            } else {
                const newUser = await prisma.user.create({
                    data:{email,name,username,password}
                });
                res.redirect('http://localhost:5173/login');
            }
        })
    },
    logout: async(req,res) => {
        req.logout((err)=> {
            if(err) {
                return next(err);
            }
            res.redirect('http://localhost:5173')
        })
    },
    
}