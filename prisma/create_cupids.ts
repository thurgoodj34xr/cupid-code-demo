import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

const CreateCupids = async (db: PrismaClient) => {
    await db.user.upsert({
        where: {
            email: "cupid@gmail.com",
        },
        create: {
            firstName: "Tim",
            lastName: "Spanler",
            email: "cupid@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    bio: "I am here to help you have the best date",
                    latitude: 41.0246,
                    longitude: -113.7919,
                    working: true
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            email: "cupid2@gmail.com",
        },
        create: {
            firstName: "Jessica",
            lastName: "Dildine",
            email: "cupid2@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    bio: "I have a cupid for 6 months now and love helping people find their true love!",
                    latitude: 43.0246,
                    longitude: -111.7919,
                    working: true
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            email: "cupid3@gmail.com",
        },
        create: {
            firstName: "Ben",
            lastName: "Carter",
            email: "cupid3@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    bio: "Let me help you have the best date of your life!",
                    latitude: 40.5746,
                    longitude: -112.7919
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            email: "cupid4@gmail.com",
        },
        create: {
            firstName: "Emily",
            lastName: "Johnson",
            email: "cupid4@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    bio: "Let me create magical moments for you and your partner!",
                    latitude: 41.0246,
                    longitude: -111.7919
                }
            }

        },
        update: {}
    })
    await db.user.upsert({
        where: {
            email: "cupid5@gmail.com",
        },
        create: {
            firstName: "Jim",
            lastName: "Smith",
            email: "cupid5@gmail.com",
            password: bcryptjs.hashSync('cupid'),
            photoUrl: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.CUPID,
            cupid: {
                create: {
                    bio: "Bringing love and joy to every date!",
                    latitude: 40.8246,
                    longitude: -111.7419
                }
            }

        },
        update: {}
    })
}

export default CreateCupids;