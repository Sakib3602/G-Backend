import { Router } from "express";
import { sendEmailForRemaiderToSign } from "../../controllers/Marketing/emailServiceMarketing/emailServiceController.js";

const router = Router();

router.post("/send-proposal-email/:email", sendEmailForRemaiderToSign);

export default router;