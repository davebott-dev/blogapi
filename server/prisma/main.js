const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const main = async () => {
    const comments = await prisma.comment.deleteMany({});
    const likes = await prisma.likes.deleteMany({})
    const posts = await prisma.post.deleteMany({});
    const profile = await prisma.profile.deleteMany({})
    const user = await prisma.user.deleteMany({})

    //    const user = await prisma.user.findMany({
    //     include:{
    //         posts:true,
    //         Profile:true,
    //     }
    // })

    console.dir(user, {depth:null});
    
};

main();
