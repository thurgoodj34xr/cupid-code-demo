import bcrypt from "bcryptjs";
import db from "../utils/prisma";
import { Role } from "@prisma/client";

export function create(user: any) {
    user.password = bcrypt.hashSync(user.password, 12);
    const { firstName, lastName, email, password, bio } = user;
    return db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: password,
        role: Role.CUPID,
        cupid: {
          create: {
            bio: bio
          }
        }
      },
      include: {
        cupid: true,
        refreshToken: true,
      }
    });
  }

export function getAll() {
    return db.user.findMany({
      where: {
        role: Role.CUPID,
      },
      include: {
        cupid: true,
      },
    });
  }