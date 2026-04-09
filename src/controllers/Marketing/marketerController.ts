import type { Request, Response } from "express";
import { Qualified } from "../../modules/Marketing/qualified.js";


export const createQualified = async (req: Request, res: Response) => {
    try{
        console.log("Request body:", req.body); 
        const qualified = await Qualified.create(req.body);
        res.status(201).json({ message: "Qualified lead created successfully"});
    }
    catch (error) {
        console.error("Error creating qualified lead:", error);
        res.status(500).json({ message: "Error creating qualified lead" });
    }
}

