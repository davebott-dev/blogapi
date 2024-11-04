require('dotenv').config();
const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'da91cn8sj',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

module.exports= {
    getUser: async(req,res) => {
        const user = await prisma.user.findFirst({
            where: {
                id:req.user.id,
            },
            include: {
                posts: true,
                Profile: true,
            }
        });
        res.json(user);
    },
    getPosts: async(req,res)=> {
            const posts = await prisma.post.findMany({
        include: {
            author:{
                include: {
                    Profile:true,
                }
            }
        }
    });
    res.json(posts);
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
                    data:{
                        email:email,
                        name:name,
                        username:username,
                        password:password,
                        Profile: {
                            create:{

                            }
                        }
                    }
                });
                res.redirect('http://localhost:5173/login');
            }
        })
    },
    upload: async(req,res)=> {
        const user = req.user.id;
        const title = req.body.title;
        const content = req.body.content;
        let isPublished=null;
        req.body.isPublished =="Yes" ? isPublished=true : isPublished=false;
        const imgUpload = await cloudinary.uploader.upload(req.file.path, {
            transformation: [
                {
                    width:400,
                    height:400
                }
            ]
        });
        const url = cloudinary.url(imgUpload.public_id)
            const newUpload = await prisma.post.create({
            data:{
                title:title,
                content:content,
                published: isPublished,
                data: url,
                authorId: user,             
            }
        });
        console.log(newUpload)
        
        res.redirect('http://localhost:5173/posts');
    
    },
    logout: async(req,res) => {
        req.logout((err)=> {
            if(err) {
                return next(err);
            }
            res.redirect('http://localhost:5173')
        })
    },
    like: async(req,res)=> {
      
        const incrememnt = await prisma.post.update({
            where:{
                id: req.params.postId
            },
            data:{
                likes: {
                    increment:1
                }
            }
        });
        res.redirect('http://localhost:5173/posts');
    }
    //make it so the user can only like a post one time 
}