import { PrismaClient } from '@prisma/client';
import db from "../utils/prisma";
import { config } from "dotenv";
import bcryptjs from "bcryptjs";
config();


async function main() {
  const user = await db.user.upsert({
    where: {
      id: 1,
    },
    create : {
      firstName: "SITE",
      lastName: "ADMIN",
      email: "admin@gmail.com",
      password: bcryptjs.hashSync('admin'),
      profile: {
        create: {
          
        }
      },
    },
    update: {
      email: "admin@gmail.com"
    }
  })
  console.log(user);
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