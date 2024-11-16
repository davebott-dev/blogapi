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
                Likes:true,
            }
        });
        res.json(user);
    },
    getPosts: async(req,res)=> {
            const posts = await prisma.post.findMany({
        include: {
            likes: true,
            comments: {
                include: {
                    likes:true,
                    author: {
                        include: {
                            Profile:true,
                        }
                    }
                }
            },
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
        const id = req.user.id;
        const postId = req.params.postId;

        try{
            const newLike = await prisma.likes.create({
            data: {
                postId:postId,
                userId:id
            }
        })} catch(err) {
            if(err.code==="P2002") {
                console.log('the post has already been liked by you');
            } else {
                throw err;
            }
        }
        res.redirect('http://localhost:5173/posts');
    },
    comment: async(req,res)=> {
        const postId = req.params.postId;
        const comment = req.body.comment;
        const userId = req.user.id;

        const newComment = await prisma.comment.create({
            data:{
                content:comment,
                postId:postId,
                userId:userId,
            }
        });
        res.redirect('http://localhost:5173/posts');
    },
    updateProfile: async(req,res) => {
        const userId = req.params.userId;
        const bio = req.body.bio;
        const imgUpload = await cloudinary.uploader.upload(req.file.path, {
            transformation: [
                {
                    width:400,
                    height:400
                }
            ]
        });
        const url = cloudinary.url(imgUpload.public_id);

        try {
            const update = await prisma.profile.update({
            where: {
                userId,
            },
            data: {
                bio: bio,
                picture:url,
            }
        }); 
     } catch (err) {
        console.log(err)
     }
     
        res.redirect('http://localhost:5173/profile');
    },
    likeComment: async(req,res)=> {
        const id = req.user.id;
        const commentId = req.params.commentId;

        try{
            const newLike = await prisma.commentLikes.create({
            data: {
                userId:id,
                commentId:commentId,
            }
        })} catch(err) {
            if(err.code==="P2002") {
                console.log('the post has already been liked by you');
            } else {
                throw err;
            }
        }
        res.redirect('http://localhost:5173/posts');
    },
        getProfile: async(req,res) => {
        const id = req.params.userId;

        const findProfile = await prisma.profile.findFirst({
            where: {
                id,
            },
            include:{
                user: {
                    include: {
                        posts: true,
                        Comment:true,
                    }
                }
                
            }
        });
        res.json(findProfile);
    },
    delete: async(req,res) => {
        const id = req.params.postId;

        const deletePost = await prisma.post.delete({
            where: {
                id,
            }
        });
        res.redirect('http://localhost:5173/posts');
    },
    deleteUser: async(req,res) => {
        const id = req.params.userId;

        const deleteUser = await prisma.user.delete({
            where: {
                id,
            }
        });
        
        res.redirect('http://localhost:5173/');
    }
}