const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const main = async () => {
    const user = await prisma.user.findMany({

        include: {
            posts:true,
        }
    });

    console.dir(user, {depth:null});
    
};

main();