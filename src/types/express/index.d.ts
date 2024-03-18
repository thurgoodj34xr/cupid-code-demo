import { PrismaClient, User } from "@prisma/client"
declare global {
    declare namespace Express {
        interface Requets {
            user?: User | undefined
        }
    }
}


// Need to match the folder name to the types that you are wanting to extend