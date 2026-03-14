import { Router } from "express";
import { checkMeeting, createMeetingSales } from "../../controllers/Sales/meetingControllers.js";

const router = Router();

router.post("/create-meeting", createMeetingSales);
router.get("/check-meeting/:leadId", checkMeeting);
export default router;