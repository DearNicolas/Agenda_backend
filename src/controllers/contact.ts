import { RequestHandler } from "express";
import * as contactServ from '../services/contact';

export const getAll: RequestHandler = async (req, res) => {
    const { id_user } = req.params;

    const items = await contactServ.getAll({
        id_user: parseInt(id_user)
    });
    if (items) return res.json({ people: items });


    res.json({ error: 'Ocorreu um erro em getAll contacts' })
}