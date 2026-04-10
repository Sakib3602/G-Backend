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

export const getQualifiedLeadsMarker = async (req: Request, res: Response) => {
    try{
        const {id} = req.params as {id: string}; // eita ashbo maketer er id

        const qualifiedLeads = await Qualified.find({assignedToMarketer: id , signature : false}).populate("createdBy", "name").populate("leadId", "leadName ServiceNeed region email phone");
        res.status(200).json(qualifiedLeads);
    }
    catch (error) {
        console.error("Error retrieving qualified leads:", error);
        res.status(500).json({ message: "Error retrieving qualified leads" });
    }
}

export const updateSignatureStatus = async (req: Request, res: Response) => {
    try{
        const {id} = req.params as {id: string}; // eita ashbo qualified lead er id
        console.log("Updating signature status for qualified lead ID:", id);
        const signatureStatus = await Qualified.findByIdAndUpdate(id, {signature: true}, {new: true});
        if(!signatureStatus){
            return res.status(404).json({message: "Qualified lead not found"});
        }
        res.status(200).json({message: "Signature status updated successfully", signatureStatus});
    }
    catch (error) {
        console.error("Error updating signature status:", error);
        res.status(500).json({ message: "Error updating signature status" });
    }
}



export const remainderToSign = async (req: Request, res: Response) => {
    try{
        const {id} = req.params as {id: string}; // eita ashbo marketer er id
        console.log("Retrieving remainder leads for marketer ID:", id);
            const minutesAgo = new Date(Date.now() - 2 * 60 * 1000); // 2 minute age er time ber korlam

         const qualifiedRemainder = await Qualified.find({
            assignedToMarketer: id,
            signature: true,
                updatedAt: { $lte: minutesAgo }
         }).select("dealFinalLink leadId").populate("leadId", "leadName email phone").populate("createdBy", "name");
         res.status(200).json(qualifiedRemainder);
    }
    catch (error) {
        console.error("Error retrieving remainder leads:", error);
        res.status(500).json({ message: "Error retrieving remainder leads" });
    }
}



export const UpdateAtTimeChangeMarketing = async(req: Request, res: Response) => {
    try{
        const { id } = req.params as { id: string };
        console.log("Updating updatedAt for marketer ID:", id);
       const up = await Qualified.findOneAndUpdate(
            { 
                _id: id,
                signature: true
            }, // filter
            { updatedAt: new Date() }, // update
            { returnDocument: "after" }
        );
        console.log("Updated document:", up);
        if (!up) {
            return res.status(404).json({ message: "up not found" });
        }
        res.status(200).json({ message: "up updated successfully", up });
    } catch (error) {
        console.error("Error updating up:", error);
        res.status(500).json({ message: "Error updating up" });

    }
}


