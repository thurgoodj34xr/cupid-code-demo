import bcrypt from "bcryptjs";
import db from "../utils/prisma";

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  });
}

export function createUser(user: any) {
  user.password = bcrypt.hashSync(user.password, 12);
  const {  firstName, lastName, email, password, age, budget, goals } = user;
  return db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: password,
      profile: {
        create: {
          age: parseInt(age),
          dailyBudget: parseFloat(budget),
          relationshipGoals: goals,
        }
      }
    },
    include: {
      profile: true,
      refreshToken: true,
    }
  });
}

export function findUserById(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      refreshToken: true,
    }
  });
}

export function getUserByProfile(id: any) {
  return db.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    }
  });
}

export function updateUserPicture(userId: any, photoUrl: string) {
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
        photoUrl,
    },
  })
}

export function updateUserBalance(userId: any, newBalance: number) {
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: {
          balance: newBalance,
        },
      },
    },
  })
}
