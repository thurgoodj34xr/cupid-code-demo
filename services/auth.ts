import db from "../utils/prisma"
import hashToken from "../utils/hashToken";

// used when we create a refresh token.
export async function addRefreshTokenToWhitelist({ refreshToken, userId }: {
  refreshToken: string,
  userId: number
}) {
  await deleteRefreshTokenByUser(userId);
  return db.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

// used to check if the token sent by the client is in the database.
export function findRefreshTokenById(id: number) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

// used to check if the token sent by the client is in the database.
export function findRefreshTokenByHash(hashedToken: string) {
  return db.refreshToken.findFirst({
    where: {
      hashedToken,
    },
  });
}

// used to check if the token sent by the client is in the database.
export async function findUserByToken(hashedToken: string) {
  const token = await db.refreshToken.findFirst({
    where: {
      hashedToken,
    },
  });
  if (!token) return;
  return db.user.findUnique({
    where: {
      id: token?.userId
    },
    include: {
      profile: true,
      refreshToken: true,
    }
  })
}

// soft delete tokens after usage.
export function deleteRefreshToken(id: number) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

// soft delete tokens after usage.
export function deleteRefreshTokenByUser(userId: number) {
  console.log(`Deleting ${userId}`)
  return db.refreshToken.deleteMany({
    where: {
      userId: userId,
    },
  });
}


export function revokeTokens(userId: number) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}