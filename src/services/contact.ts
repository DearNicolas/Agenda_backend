import { PrismaClient, Prisma } from "@prisma/client";
import * as users from './users';

const prisma = new PrismaClient();

export const getAll = async (id_user: number) => {
    console.log(id_user)
    try {
        return await prisma.$queryRaw`select * from public."Contact" where id_user = ${id_user};`;
    } catch (err) { return err }
}

type GetOneFilters = { id_user: number; id?: number; name?: string; }
export const getOne = async (filters: GetOneFilters) => {
    try {
        if (!filters.id && !filters.name) return false;
        return await prisma.$queryRaw`select id,id_user from public."Contact" where id_user = ${filters.id_user} and id = ${filters.id} limit 1`
    } catch (err) { return false }
}

type ContactAdd = { id_user: number; name: string; number: string; }
export const add = async (data: ContactAdd) => {
    try {
        if (!data.id_user) return false;
        console.log(data);
        return await prisma.$queryRaw` insert into public."Contact" (id_user, name, number) values (${data.id_user}, ${data.name}, ${data.number})`
    } catch (err) { return false; }
}

type ContactUpdateData = Prisma.Args<typeof prisma.contact, 'update'>['data']
type UpdateFilters = { id?: number; id_user: number; }
export const update = async (filters: UpdateFilters, data: ContactUpdateData) => {
    try {
        return await prisma.contact.updateMany({ where: filters, data });
    } catch (err) { return false }
}

type DeleteFilters = { id: number; id_user: number; }
export const remove = async (filters: DeleteFilters) => {
    try {
        return await prisma.$queryRaw`delete from public."Contact" where id = ${filters.id} and id_user = ${filters.id_user}`;
    } catch (err) { return false }
}