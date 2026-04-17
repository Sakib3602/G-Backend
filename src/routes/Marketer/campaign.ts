import { Router } from "express";
import { allCampaign, campaignDone, createCampaign } from "../../controllers/Marketing/campaignController.js";

const router = Router();

router.post('/create-campaign', createCampaign);
router.get('/all-campaigns/:id', allCampaign);
router.get('/completed-campaigns/:id', campaignDone);

export default router;