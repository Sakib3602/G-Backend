import type { Request, Response } from "express";
import { Lead } from "../modules/Lead.js";


// create lead
export const createLead = async (req: Request, res: Response) => {
    try{
        console.log("Request body:", req.body); 
        const lead = await Lead.create(req.body);
        res.status(201).json({ message: "Lead created successfully", lead });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({ message: "Error creating lead" });
    }
}