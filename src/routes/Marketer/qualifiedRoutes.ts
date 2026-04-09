import { Router } from "express";
import { createQualified } from "../../controllers/Marketing/marketerController.js";

const router = Router();

router.post("/create-qualified", createQualified);


export default router;