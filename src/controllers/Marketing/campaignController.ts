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

export const allCampaign = async(req:   Request, res: Response) => {
    try{
        const {id} = req.params as {id: string}; // eita ashbo marketer er id
         const today = new Date();

        const campaigns = await Campaign.find({marketerId: id  , endDate : { $gte: today } }).populate("marketerId", "name");
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: "Error fetching campaigns", error });
    }

}

export const campaignDone = async(req: Request, res: Response) => {
    try{
        const {id} = req.params as {id: string}; // eita ashbo marketing er id
        const today = new Date();

        const campaigns = await Campaign.find({ marketerId: id, endDate: { $lte: today } })
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: "Error fetching completed campaigns", error });
    }
}

export const addRevenue = async(req: Request, res: Response) => {
    try {
        const { campaignId } = req.params as { campaignId: string };
        const { revenue } = req.body as { revenue: number };
        const campaign = await Campaign.findByIdAndUpdate(campaignId, { revenue }, { new: true });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: "Error adding revenue", error });
    }
}




