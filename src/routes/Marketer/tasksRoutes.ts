import { Router } from "express";
import { getAllCampaignsForMarketerForAddTask, getAllEmployeesForAddTask } from "../../controllers/Marketing/taskController.js";


const router = Router();

router.get("/all-campaigns/:marketerId", getAllCampaignsForMarketerForAddTask);
router.get("/all-team-members/:marketerId", getAllEmployeesForAddTask);

export default router;