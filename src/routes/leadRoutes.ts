import { Router } from "express";
import { createLead, getAllLeads } from "../controllers/leadControllers.js";


const router = Router();


router.post("/create-lead", createLead);
router.get("/get-all-leads", getAllLeads);
export default router;