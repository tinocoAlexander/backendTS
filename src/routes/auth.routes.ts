import { Router } from 'express';
import { login, getTimeToken, updateToken, getAllUsers, saveUser, updateUser, deleteUser } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.get('/token-time', getTimeToken);
router.patch('/token-time/:userId', updateToken);
router.get('/users', getAllUsers);
router.post('/create-user', saveUser);
router.patch('/update-user/:userId', updateUser);
router.delete('/delete-user/:userId', deleteUser);

export default router;
