import { NotificationType, PrismaClient } from '@prisma/client';
import { config } from "dotenv";
import bcryptjs from "bcryptjs";
const db = new PrismaClient();


async function main() {

  // *********** Create Standard User ***************

  const user = await db.user.upsert({
    where: {
      id: 1,
    },
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: bcryptjs.hashSync('johndoe'),
      photoUrl: "https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg",
      profile: {
        create: {
          age: 23,
          dailyBudget: 15,
          relationshipGoals: "Go on a lot of dates",
        }
      },
    },
    update: {
      email: "admin@gmail.com"
    }
  })
  const notification = await db.notifications.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      userId: 1,
      title: "Welcome to CupidCode!",
      message: "You have found the path to smoother dating",
      type: NotificationType.DAILY,
    },
    update: {

    }
  })
  const purchase = await db.purchases.upsert({
    where: {
      id: 1,
    },
    create: {
      userId: 1,
      total: 10,
      jobCost: 7,
      cupidPayout: 3,
      profit: 5,
      details: "Panda Express",
    },
    update: {}
  });

  const purchase2 = await db.purchases.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      userId: 1,
      total: 15,
      jobCost: 7,
      cupidPayout: 3,
      profit: 5,
      details: "Movie Tickets",
    },
    update: {}
  });
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })