import { RequestHandler } from "express";
import * as contactServ from '../services/contact';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const { id_user } = req.params;

    const items = await contactServ.getAll({
        id_user: parseInt(id_user)
    });
    if (items) return res.json({ people: items });


    res.json({ error: 'Ocorreu um erro em getAll contacts' })
}

export const getContact: RequestHandler = async (req, res) => {
    const { id, id_user } = req.params;

    const contactItem = await contactServ.getOne({
        id: parseInt(id),
        id_user: parseInt(id_user)
    });
    if (contactItem) return res.json({ contact: contactItem })


    res.json({ error: 'Ocorreu um erro em getAll contacts' })
}

export const addContact: RequestHandler = async (req, res) => {
    const { id_user } = req.params;

    const addContactSchema = z.object({
        name: z.string(),
        number: z.number(),
        status: z.string()
    })
    const body = addContactSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados invalidos' });
}