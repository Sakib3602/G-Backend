import type { Request, Response } from "express";
import { Lead } from "../../modules/Sales/Lead.js";



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



export const getMyLeads = async (req: Request, res: Response) => {
    try{
        const leads = await Lead.find({
            status: { $in: ["New Lead",  "Attempted to contact",'Contacted'] }
        });
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}

export const getContactedLeads = async(req: Request, res: Response) => {
    try{
        const leads = await Lead.find({
            status: 'Contacted'
        });
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}


export const updateLeadStatus = async (req: Request, res: Response) => {
    try {
        const { leadId } = req.params as { leadId: string };
        const { status } = req.body as { status: string };

        const lead = await Lead.findByIdAndUpdate(leadId, { status }, { new: true });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.status(200).json({ message: "Lead status updated successfully", lead });
    } catch (error) {
        console.error("Error updating lead status:", error);
        res.status(500).json({ message: "Error updating lead status" });

    }
}