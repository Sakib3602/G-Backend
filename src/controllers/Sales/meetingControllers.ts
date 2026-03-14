import type { Request, Response } from "express";
import { Meeting } from "../../modules/Sales/Meetings.js";


export const createMeetingSales = async (req: Request, res: Response) => {
    try{
        console.log("Request body:", req.body); 
        const meeting = await Meeting.create(req.body);
        res.status(201).json({ message: "Meeting created successfully" , meeting});
    } catch (error) {
        res.status(500).json({ message: "Error creating meeting" });
    }
}