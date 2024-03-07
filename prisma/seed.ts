import { PrismaClient } from '@prisma/client';
import CreateCupids from './create_cupids';
import CreateNotifications from './create_notifications';
import CreatePurchases from './create_purchases';
import CreateUsers from './create_users';
import CreateAdmins from './create_admin';
const db = new PrismaClient();


async function main() {
  await CreateUsers(db);
  await CreateCupids(db);
  await CreateAdmins(db);
  await CreateNotifications(db);
  await CreatePurchases(db);
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