import { Router } from "express";
import * as authCo from '../controllers/auth';
import * as userCo from '../controllers/users';
import * as contactCo from '../controllers/contact';

const router = Router();

router.post('/login', authCo.login);

router.get('/ping', authCo.validate, (req, res) => res.json({ pong: true, admin: true }));

router.get('/users', authCo.validate, userCo.getAll);
router.get('/users/:id', authCo.validate, userCo.getUser);
router.post('/users', authCo.validate, userCo.addUser);
router.put('/users/:id', authCo.validate, userCo.updateUser);
router.delete('/users/:id', authCo.validate, userCo.deleteUser);

router.get('/users/:id_user/contacts', authCo.validate, contactCo.getAll);
router.get('/users/:id_user/contacts/:id', authCo.validate, contactCo.getContact);
router.post('/users/:id_user/contacts', authCo.validate, contactCo.addContact);
router.put('/users/:id_user/contacts/:id', authCo.validate, contactCo.updateContact);
router.delete('/users/:id_user/contacts/:id', authCo.validate, contactCo.deleteContact);

export default router;