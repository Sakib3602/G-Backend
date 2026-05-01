import { Router } from "express";
import { DesignerTasks } from "../../controllers/Designer/DtaskControllers.js";

const router = Router();

router.get("/my-tasks/:designerId", DesignerTasks);

export default router;
