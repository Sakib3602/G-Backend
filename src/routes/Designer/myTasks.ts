import { Router } from "express";
import { changeStatus, DesignerTasks, progressUpdate, runningDesignerTasks} from "../../controllers/Designer/DtaskControllers.js";

const router = Router();

router.get("/my-tasks/:designerId", DesignerTasks);
router.get("/running-tasks/:designerId", runningDesignerTasks);
router.post("/change-status/:taskId", changeStatus);
router.post('/update-progress/:taskId', progressUpdate);
export default router;
