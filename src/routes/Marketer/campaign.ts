import { Router } from "express";
import { createCampaign } from "../../controllers/Marketing/campaignController.js";

const router = Router();

router.post('/create-campaign', createCampaign);


export default router;