import { Router } from "express";
import { createQualified, getQualifiedLeadsMarker, remainderToSign, UpdateAtTimeChangeMarketing, updateSignatureStatus } from "../../controllers/Marketing/marketerController.js";

const router = Router();

router.post("/create-qualified", createQualified);
router.get("/qualified-leads/:id", getQualifiedLeadsMarker);
router.put("/update-signature/:id", updateSignatureStatus);
router.get("/remainder-to-sign/:id", remainderToSign);
router.put("/updateTime-Marketing/:id", UpdateAtTimeChangeMarketing);


export default router;