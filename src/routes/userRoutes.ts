import { Router } from "express";
import { createUser, getUserByEmail } from "../controllers/userControllers.js";


const router = Router();

router.post('/users', createUser);

router.get('/user/:email', getUserByEmail);

export default router;