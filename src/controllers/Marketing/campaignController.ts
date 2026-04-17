import type { Request, Response } from "express";
import { Campaign } from "../../modules/Marketing/campaign.js";


export const createCampaign = async (req: Request, res: Response) => {
    try{
        const body = req.body;
        console.log("Campaign creation request body:", body);
        const create = await Campaign.create(body);
        res.status(201).json({ message: "Campaign created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating campaign", error });
    }
}