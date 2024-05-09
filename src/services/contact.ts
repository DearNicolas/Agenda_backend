import { PrismaClient, Prisma } from "@prisma/client";
import * as users from './users';

const prisma = new PrismaClient();

type GetAllFilters = { id_user: number; };
export const getAll = async (filters: GetAllFilters) => {
    try {
        return await prisma.contact.findMany({ where: filters });
    } catch (err) { return false }
}

type GetOneFilters = { id_user: number; id?: number; name?: string; }
export const getOne = async (filters: GetOneFilters) => {
    try {
        if (!filters.id && !filters.name) return false;
        return await prisma.contact.findFirst({ where: filters });
    } catch (err) { return false }
}

type PeopleCreateData = Prisma.Args<typeof prisma.contact, 'create'>['data'];
export const add = async (data: PeopleCreateData) => {
    try {
        if (!data.id_user) return false;

        return await prisma.contact.create({ data });
    } catch (err) { return false; }
}