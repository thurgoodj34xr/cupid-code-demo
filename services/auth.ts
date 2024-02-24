import db from "../utils/prisma"
import hashToken from "../utils/hashToken";

// used when we create a refresh token.
export function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: {
  jti: any,
  refreshToken: string,
  userId: number
}) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId
    },
  });
}

// used to check if the token sent by the client is in the database.
export function findRefreshTokenById(id: any) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

// soft delete tokens after usage.
export function deleteRefreshToken(id: any) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}


export function revokeTokens(userId:any) {
  return db.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}