import { PrismaClient } from "@prisma/client";
import hashToken from "../utils/hash_token";

export default class AuthRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }
    // used when we create a refresh token.
    async addRefreshTokenToWhitelist({ refreshToken, userId }: {
        refreshToken: string,
        userId: number
    }) {
        await this.deleteRefreshTokenByUser(userId);
        return this.db.refreshToken.create({
            data: {
                hashedToken: hashToken(refreshToken),
                userId
            },
        });
    }

    // used to check if the token sent by the client is in the database.
    findRefreshTokenById(id: number) {
        return this.db.refreshToken.findUnique({
            where: {
                id,
            },
        });
    }

    // used to check if the token sent by the client is in the database.
    findRefreshTokenByHash(hashedToken: string) {
        return this.db.refreshToken.findFirst({
            where: {
                hashedToken,
            },
        });
    }

    // used to check if the token sent by the client is in the database.
    async findUserByToken(hashedToken: string) {
        const token = await this.db.refreshToken.findFirst({
            where: {
                hashedToken,
            },
        });
        if (!token) return;
        return this.db.user.findUnique({
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
    deleteRefreshToken(id: number) {
        return this.db.refreshToken.update({
            where: {
                id,
            },
            data: {
                revoked: true
            }
        });
    }

    // soft delete tokens after usage.
    deleteRefreshTokenByUser(userId: number) {
        console.log(`Deleting ${userId}`)
        return this.db.refreshToken.deleteMany({
            where: {
                userId: userId,
            },
        });
    }


    revokeTokens(userId: number) {
        return this.db.refreshToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        });
    }
}