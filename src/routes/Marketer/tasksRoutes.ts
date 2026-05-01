import { Router } from "express";
import { createTask, DesignerTasks, getAllCampaignsForMarketerForAddTask, getAllEmployeesForAddTask,  getAllTasks} from "../../controllers/Marketing/taskController.js";


const router = Router();

router.get("/all-campaigns/:marketerId", getAllCampaignsForMarketerForAddTask);
router.get("/all-team-members/:marketerId", getAllEmployeesForAddTask);
router.get("/all-tasks/:marketerId", getAllTasks);
router.post("/create-marketing-task", createTask);
// ===========Deshboard er jonno task show korar route================
router.get("/designer/my-tasks/:designerId", DesignerTasks);
export default router;