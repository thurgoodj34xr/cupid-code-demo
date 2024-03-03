import bcrypt from "bcryptjs";
import db from "../utils/prisma";
import e from "express";
import { Role } from "@prisma/client";

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
      cupid: true,
    },
  });
}

export function create(user: any) {
  user.password = bcrypt.hashSync(user.password, 12);
  const { firstName, lastName, email, password, age, budget, goals } = user;
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
      },
      role: Role.STANDARD,
    },
    include: {
      profile: true,
      cupid: true,
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
      cupid: true,
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
      cupid: true,
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
export function updateUserAccount(userId: any, firstName: string, lastName: string, email: string, age: number, dailyBudget: number, relationshipGoals: string) {
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      profile: {
        update: {
          dailyBudget: dailyBudget,
          age: age,
          relationshipGoals: relationshipGoals
        },
      },
    },
  })
}
export function updateUserPassword(userId: any, password: string,) {
  const newPassword = bcrypt.hashSync(password, 12);
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newPassword
    },
  })
}