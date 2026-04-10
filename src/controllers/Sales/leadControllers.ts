import type { Request, Response } from "express";
import { Lead } from "../../modules/Sales/Lead.js";
import { Qualified } from "../../modules/Marketing/qualified.js";
import { User } from "../../modules/User.js";



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
        const  id  = req.params.id as string;
        console.log("User ID from params:", id);
        const leads = await Lead.find({
            leadCreatedBy: id,
            status: { $in: ["New Lead",  "Attempted to contact",'Contacted'] }
        });
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}

export const getInProgress= async (req: Request, res: Response) => {
    try{
        const  id  = req.params.id as string;
        // console.log("User ID from params:", id);
        const leads = await Lead.find({
            leadCreatedBy: id,
            status: { $in: ["In Progress"] }
        });
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}

export const getContactedLeads = async(req: Request, res: Response) => {
    try{
        const { id } = req.params as { id: string };
      
        const leads = await Lead.find({
            leadCreatedBy: id,
            status: 'Contacted'
        });
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}
export const getQualifiedLeads = async(req: Request, res: Response) => {
    try{
        const { id } = req.params as { id: string };
     
        const leads = await Lead.find({
            leadCreatedBy: id,
            status: 'Qualified'
        });
    
    
        
        
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}
export const getUnqualifiedLeads = async(req: Request, res: Response) => {
    try{
        const { id } = req.params as { id: string };
        const leads = await Lead.find({
            leadCreatedBy: id,
            status: 'Unqualified'
        });
        res.status(200).json({ message: "Leads retrieved successfully", leads });
    } catch (error) {
        console.error("Error retrieving leads:", error);
        res.status(500).json({ message: "Error retrieving leads" });
    }
}




// udate status and assign marketer if qualified
export const updateLeadStatus = async (req: Request, res: Response) => {
    try {
        const { leadId } = req.params as { leadId: string };
        const { status } = req.body as { status: string };
        const { dealDocLink } = req.body as { dealDocLink: string };

        const statusText = String(status ?? "").trim(); 
        if (!statusText) {
            return res.status(400).json({ message: "Status is required" });
        }

        const statusMap: Record<string, string> = {
            "new lead": "New Lead",
            "attempted to contact": "Attempted to contact",
            "contacted": "Contacted",
            "in progress": "In Progress",
            "qualified": "Qualified",
            "unqualified": "Unqualified"
        };
        const normalizedStatus = statusMap[statusText.toLowerCase()] ?? statusText;
        const dealDocLinkText = String(dealDocLink ?? "").trim();

      

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        const updatePayload: { status: string; assignedToMarketer?: string } = { status: normalizedStatus };

        if (normalizedStatus === "Qualified") {
            if (!dealDocLinkText) {
                return res.status(400).json({ message: "dealDocLink is required when status is Qualified" });
            }

            // 1. Get all marketers
        const marketers = await User.find({ role: { $regex: /^(marketer|marketing)$/i } });

        if (!marketers.length) {
            return res.status(400).json({ message: "No marketer found to assign this lead" });
        }

        let selectedMarketer = null;
        let minCount = Infinity;


        // 2. Loop each marketer
        for (const marketer of marketers) {

            // count how many leads assigned to this marketer
            const count = await Lead.countDocuments({
            assignedToMarketer: String(marketer._id),
            status: "Qualified"
            });

            // 3. find minimum
            if (count < minCount) {
            minCount = count;
            selectedMarketer = marketer;
            }
        }

        updatePayload.assignedToMarketer = String(selectedMarketer?._id ?? "");

       
        }

        const updatedLead = await Lead.findByIdAndUpdate(leadId, updatePayload, { new: true });

        if (normalizedStatus === "Qualified") {
            await Qualified.findOneAndUpdate(
                { leadId: lead._id },
                {
                    signature: false,
                    createdBy: lead.leadCreatedBy,
                    dealFinalLink: dealDocLinkText,
                    assignedToMarketer: updatePayload.assignedToMarketer ?? ""
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }

        res.status(200).json({ message: "Lead status updated successfully", lead: updatedLead });
    } catch (error) {
        console.error("Error updating lead status:", error);
        res.status(500).json({ message: "Error updating lead status" });

    }
}


export const ProposalSent = async(req: Request, res: Response) => {
    try{
        const { leadId } = req.params as { leadId: string };


        const lead = await Lead.findByIdAndUpdate(leadId, { proposalSent: true }, { new: true });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.status(200).json({ message: "Proposal status updated successfully", lead });
    } catch (error) {
        console.error("Error updating proposal status:", error);
        res.status(500).json({ message: "Error updating proposal status" });
    }
}

// 2 min use korsi
export const getReminders = async(req: Request, res: Response) => {
    try{
        const { leadId } = req.params as { leadId: string };
        const MinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
        // const threeDaysAgo = new Date();
        // threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const reminders = await Lead.find({        
            leadCreatedBy: leadId,
            proposalSent: true,
            status: { $nin: ["Qualified", "Unqualified"] },
            updatedAt: { $lte: MinutesAgo }
        });
        console.log("Reminders found:", reminders);
         res.status(200).json({
        data: reminders
});


    } catch (error) {
        console.error("Error retrieving reminders:", error);
        res.status(500).json({ message: "Error retrieving reminders" });
    }
}


export const UpdateAtTimeChange = async(req: Request, res: Response) => {
    try{
        const { leadId } = req.params as { leadId: string };
        const lead = await Lead.findByIdAndUpdate(leadId, { updatedAt: new Date() }, { new: true });

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead updated successfully", lead });
    } catch (error) {
        console.error("Error updating lead:", error);
        res.status(500).json({ message: "Error updating lead" });

    }
}



export const DashboardData = async(req: Request, res: Response) => {
    try{
        const { userId } = req.params as { userId: string };
        const totalLeads = await Lead.countDocuments({ leadCreatedBy: userId });
        const newLeads = await Lead.countDocuments({ leadCreatedBy: userId, status: "New Lead" });
        const inProgressLeads = await Lead.countDocuments({ leadCreatedBy: userId, status: "In Progress" });
        const contactedLeads = await Lead.countDocuments({ leadCreatedBy: userId, status: "Contacted" });
        const qualifiedLeads = await Lead.countDocuments({ leadCreatedBy: userId, status: "Qualified" });
        const unqualifiedLeads = await Lead.countDocuments({ leadCreatedBy: userId, status: "Unqualified" });

         const MinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
        // const threeDaysAgo = new Date();
        // threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const reminders = await Lead.find({        
            leadCreatedBy: userId,
            proposalSent: true,
            status: { $nin: ["Qualified", "Unqualified"] },
            updatedAt: { $lte: MinutesAgo }
        }).countDocuments();

        const ActionRequiredCount = await Lead.countDocuments({ leadCreatedBy: userId, proposalSent: false ,status: "In Progress"});
        const AwaitResponseCount = await Lead.countDocuments({ leadCreatedBy: userId, proposalSent: true, status: "In Progress"  });

        // Win Rate (%) = (Qualified / Total Leads) * 100
        const winRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0;

        res.status(200).json({
            totalLeads,
            newLeads,
            inProgressLeads,
            contactedLeads,
            qualifiedLeads,
            unqualifiedLeads,
            reminders,
            ActionRequiredCount,
            AwaitResponseCount,
            winRate: winRate.toFixed(2) // Round to 2 decimal places
        });
    }
        catch (error) {
        console.error("Error retrieving dashboard data:", error);
        res.status(500).json({ message: "Error retrieving dashboard data" });
    }
}

