import { Router } from "express";
import { createLead, getContactedLeads, getMyLeads, updateLeadStatus,getInProgress, ProposalSent, getReminders, UpdateAtTimeChange, DashboardData, getQualifiedLeads, getUnqualifiedLeads } from "../../controllers/Sales/leadControllers.js";




const router = Router();


router.post("/create-lead", createLead);
router.get("/get-my-leads/:id", getMyLeads);
router.get("/get-in-progress-leads/:id", getInProgress);
router.get("/get-contacted-leads/:id", getContactedLeads);
router.get("/get-qualified-leads/:id", getQualifiedLeads);
router.get("/get-unqualified-leads/:id", getUnqualifiedLeads);
router.put("/update-lead-status/:leadId", updateLeadStatus);
router.put("/mark-proposal-sent/:leadId", ProposalSent);
router.get('/rem/:leadId', getReminders);
router.put("/update-at-time/:leadId", UpdateAtTimeChange);
router.get('/dashboard/:userId', DashboardData);


export default router;