const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient();

module.exports= {
    getPosts: async(req,res) => {
        res.send("hello world");
    },
    createUser: async(req,res)=> {
        const username = req.body.username;
        const password= req.body.password;
        const name = req.body.name;
        const email= req.body.email;

        const newUser = await prisma.user.create({
            data:{email,name,username,password}
        });
        res.redirect('http://localhost:5173/login');
    }
}