import { Router } from "express";
import { sendLeadEmail } from "../../controllers/Sales/emailService/emailServiceControler.js";


const router = Router();
router.post("/send-proposal-email", sendLeadEmail);

export default router;