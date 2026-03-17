import { Router } from "express";
import { createLead, getContactedLeads, getMyLeads, updateLeadStatus,getInProgress } from "../../controllers/Sales/leadControllers.js";



const router = Router();


router.post("/create-lead", createLead);
router.get("/get-my-leads/:id", getMyLeads);
router.get("/get-in-progress-leads/:id", getInProgress);
router.get("/get-contacted-leads", getContactedLeads);
router.put("/update-lead-status/:leadId", updateLeadStatus);


export default router;