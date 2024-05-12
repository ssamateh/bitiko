import { PrismaClient } from "@prisma/client";

const prismaClient = () => new PrismaClient()

const globalPrisma = globalThis as unknown as { prisma: ReturnType<typeof prismaClient> | undefined }

const prisma = globalPrisma.prisma ?? prismaClient()

export default prisma

if (process.env.NODE_ENV !== 'production') {
    globalPrisma.prisma = prisma
}