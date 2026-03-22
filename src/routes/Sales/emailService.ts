import { Router } from "express";
import { sendLeadProposalEmail, sendRemainderEmail } from "../../controllers/Sales/emailService/emailServiceControler.js";


const router = Router();
router.post("/send-proposal-email", sendLeadProposalEmail);
router.post("/send-reminder-email/:email", sendRemainderEmail);
export default router;