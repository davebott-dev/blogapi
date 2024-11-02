const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const main = async () => {
    // const user = await prisma.user.findMany({
    //     include:{
    //         posts:true
    //     }
    // });
    const posts = await prisma.post.deleteMany({})

    console.dir(posts, {depth:null});
    
};

main();