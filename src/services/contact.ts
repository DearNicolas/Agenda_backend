import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type GetAllFilters = { id_user: number };
export const getAll = async (filters: GetAllFilters) => {
    try {
        return await prisma.contact.findMany({ where: filters });
    } catch (err) { return false }
}