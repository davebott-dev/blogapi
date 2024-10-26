const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient();

module.exports= {
    getPosts: async(req,res) => {
        res.send("hello world");
    }
}