import { RequestHandler } from "express";
import * as users from '../services/users';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const items = await users.getAll();
    if (items) return res.json({ users: items });

    res.json({ error: 'Ocorreu um erro em getAll users' })
}

export const getUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const userItem = await users.getOne(parseInt(id));
    if (userItem) return res.json({ user: userItem });

    res.json({ error: 'Ocorreu um erro em getOne user' })
}

export const addUser: RequestHandler = async (req, res) => {
    const addUserSchema = z.object({
        name: z.string(),
        number: z.string().transform(val => val.replace(/\-|/gm, '')),
    });
    const body = addUserSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados invalidos' });

    const newUser = await users.add(body.data);
    if (newUser) return res.status(201).json({ user: newUser });

    res.json({ error: 'Ocorreu um erro em addUser' });
}

export const updateUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updateUserSchema = z.object({
        name: z.string().optional(),
        number: z.string().optional(),
    });
    const body = updateUserSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados inválidos' });

    const updatedUser = await users.update(parseInt(id), body.data);
    if (updatedUser) {
        return res.json({ user: updatedUser });
    }

    res.json({ error: 'Ocorreu um erro em updateUser' });
}

export const deleteUser: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const deletedUser = await users.remove(parseInt(id));
    if (deletedUser) return res.json({ user: deletedUser });
}