import { Router } from "express";
import { createTask, getAllCampaignsForMarketerForAddTask, getAllEmployeesForAddTask,  getAllTasks} from "../../controllers/Marketing/taskController.js";


const router = Router();

router.get("/all-campaigns/:marketerId", getAllCampaignsForMarketerForAddTask);
router.get("/all-team-members/:marketerId", getAllEmployeesForAddTask);
router.get("/all-tasks/:marketerId", getAllTasks);
router.post("/create-marketing-task", createTask);


export default router;