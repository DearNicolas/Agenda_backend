import { RequestHandler } from "express";

export const getAll: RequestHandler = async (req, res) => {

    res.json({ error: 'Ocorreu um erro em getAll users' })
}