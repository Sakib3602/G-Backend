import type { Request, Response } from "express";
import { Campaign } from "../../modules/Marketing/campaign.js";
import { User } from "../../modules/User.js";


export const getAllCampaignsForMarketerForAddTask = async (req: Request, res: Response) => {
    try{
        const { marketerId } = req.params as { marketerId: string };
        const today = new Date();
        const cam = await Campaign.find({ marketerId , endDate : { $gte: today } }).select("campaignName _id");
        res.status(200).json(cam);
    } catch (error) {
        res.status(500).json({ message: "Error fetching campaigns", error });
    }
}


export const getAllEmployeesForAddTask = async (req: Request, res: Response) => {
    try{
        const { marketerId } = req.params as { marketerId: string };
        const employee = await User.find(
           { role : { $nin : ["admin", 'user']},  // admin bad ar amar nuje rid bad jaibo
            _id: { $ne: marketerId }
          }
        ).select("name _id role");

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
}