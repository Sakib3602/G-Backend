import { Router } from "express";
import { checkMeeting, createMeetingSales, deletingMeeting, getAllMeetings } from "../../controllers/Sales/meetingControllers.js";

const router = Router();

router.post("/create-meeting", createMeetingSales);
router.get("/check-meeting/:leadId", checkMeeting);
router.get("/meetings/:id", getAllMeetings);
router.delete('/delete-meeting/:id', deletingMeeting);
export default router;