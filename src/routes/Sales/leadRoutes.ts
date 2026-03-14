import { Router } from "express";
import { createLead, getContactedLeads, getMyLeads } from "../../controllers/Sales/leadControllers.js";



const router = Router();


router.post("/create-lead", createLead);
router.get("/get-my-leads", getMyLeads);
router.get("/get-contacted-leads", getContactedLeads);
export default router;