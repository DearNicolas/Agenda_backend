import { RequestHandler } from "express";
import * as contactServ from '../services/contact';
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const { id_user } = req.params;

    const itens = await contactServ.getAll(parseInt(id_user));
    console.log('err1')
    if (itens) {
        console.log('err2')
        console.table(itens)
        return res.json({ contact: itens });
    }
    console.log('err3')
    res.json({ error: 'Ocorreu um erro em getAll contacts' })
}

export const getContact: RequestHandler = async (req, res) => {
    const { id, id_user } = req.params;

    const contactItem = await contactServ.getOne({
        id: parseInt(id),
        id_user: parseInt(id_user)
    });
    console.log(contactItem);
    if (contactItem) return res.json({ contact: contactItem })


    res.json({ error: 'Ocorreu um erro em getOne contacts' })
}

export const addContact: RequestHandler = async (req, res) => {
    const { id_user } = req.params;

    const addContactSchema = z.object({
        name: z.string(),
        number: z.string().transform(val => val.replace(/\-|()/gm, '')),
    })
    const body = addContactSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados invalidos' });

    const newContact = await contactServ.add({
        name: body.data.name,
        number: body.data.number,
        id_user: parseInt(id_user),
    })

    if (newContact) return res.status(201).json({ contact: newContact });

    res.json({ error: 'Ocorreu um erro' });
}

export const updateContact: RequestHandler = async (req, res) => {
    const { id, id_user } = req.params;

    const updateContactSchema = z.object({
        name: z.string().optional(),
        number: z.string().transform(val => val.replace(/\-|()/gm, '')).optional(),
    });
    const body = updateContactSchema.safeParse(req.body);
    //console.log(body.data)
    if (!body.success) return res.json({ error: 'Dados inválidos' });

    const updatedContact = await contactServ.update({
        id: parseInt(id),
        id_user: parseInt(id_user)
    }, body.data)
    //console.log(updatedContact)
    if (updatedContact) {
        const contactItem = await contactServ.getOne({
            id: parseInt(id),
            id_user: parseInt(id_user)
        });
        console.log(contactItem)
        return res.json({ contact: contactItem })
    }

    res.json({ error: 'Ocorreu um erro' });
}

export const deleteContact: RequestHandler = async (req, res) => {
    const { id, id_user } = req.params;

    const deletedContact = await contactServ.remove({
        id: parseInt(id),
        id_user: parseInt(id_user)
    });
    if (deletedContact) return res.json({ contact: deletedContact });

    res.json({ error: 'Ocorreu um erro' });
}