import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.user.findMany();
    } catch (err) { return false; }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.user.findFirst({ where: { id } })
    } catch (err) { return false; }
}

type UserCreateData = Prisma.Args<typeof prisma.user, 'create'>['data'];
export const add = async (data: UserCreateData) => {
    try {
        return await prisma.user.create({ data })
    } catch (err) { return false }
}


export const remove = async (id: number) => {
    try {
        return await prisma.user.delete({ where: { id } });
    } catch (err) { return false }
}