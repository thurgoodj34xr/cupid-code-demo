import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

const CreateCupids = async (db: PrismaClient) => {
    await db.user.upsert({
        where: {
            id: 2,
        },
        create: {
            id: 2,
            firstName: "Tim",
            lastName: "Spanler",
            email: "cupid@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    id: 1,
                    bio: "I am here to help you have the best date",
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            id: 3,
        },
        create: {
            id: 3,
            firstName: "Jessica",
            lastName: "Dildine",
            email: "cupid2@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    id: 2,
                    bio: "I have a cupid for 6 1onths now and love helping people find their true love!",
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            id: 4,
        },
        create: {
            id: 4,
            firstName: "Ben",
            lastName: "Carter",
            email: "cupid3@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    id: 3,
                    bio: "Let me help you have the best date of your life!",
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            id: 5,
        },
        create: {
            id: 5,
            firstName: "Emily",
            lastName: "Johnson",
            email: "cupid4@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    id: 4,
                    bio: "Let me create magical moments for you and your partner!",
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            id: 6,
        },
        create: {
            id: 6,
            firstName: "Jim",
            lastName: "Smith",
            email: "cupid5@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    id: 5,
                    bio: "Bringing love and joy to every date!",
                }
            }

        },
        update: {}
    })
}

export default CreateCupids;