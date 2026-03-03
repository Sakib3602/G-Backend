import { Router } from "express";
import { createUser } from "../controllers/userControllers.js";


const router = Router();

router.post('/users', createUser);

export default router;