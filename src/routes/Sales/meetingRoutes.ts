import { Router } from "express";
import { createMeetingSales } from "../../controllers/Sales/meetingControllers.js";

const router = Router();

router.post("/create-meeting", createMeetingSales);

export default router;