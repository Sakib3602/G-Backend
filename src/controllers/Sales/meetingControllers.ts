import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Meeting } from "../../modules/Sales/Meetings.js";
import { Lead } from "../../modules/Sales/Lead.js";

export const createMeetingSales = async (req: Request, res: Response) => {
  try {
    console.log("Request body:", req.body);

    const meeting = await Meeting.create(req.body);

    const { leadId } = req.body as { leadId?: string };
    if (leadId) {
      if (isValidObjectId(leadId)) {
        const lead = await Lead.findById(leadId);
        if (lead) {
          const keepSameStatuses = [
            "Contacted",
            "In Progress",
            "Qualified",
            "Unqualified",
          ];
          if (!keepSameStatuses.includes(lead.status)) {
            lead.status = "Contacted";
            await lead.save();
          }
        }
      }
    }

    res.status(201).json({ message: "Meeting created successfully", meeting });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Error creating meeting" });
  }
};

export const checkMeeting = async (req: Request, res: Response) => {
  try {
    const { leadId } = req.params as { leadId: string };

    const meeting = await Meeting.findOne({ leadId });

    if (meeting) {
      return res.status(200).json({
        message: "Meeting exists for this lead",
        meeting: true,
      });
    }

    return res.status(200).json({
      message: "No meeting found for this lead",
      meeting: false,
    });
  } catch (error) {
    console.error("Error checking meeting:", error);

    return res.status(500).json({
      message: "Error checking meeting",
    });
  }
};

export const getAllMeetings = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    // console.log("Scheduler ID:", id);
    const meetings = await Meeting.find({ schedulerId: id }).sort({
      meetingDate: 1,
      meetingTime: 1,
    });
    // console.log("Meetings:", meetings);
    res
      .status(200)
      .json({ message: "Meetings retrieved successfully", meetings });
  } catch (error) {
    console.error("Error retrieving meetings:", error);
    res.status(500).json({ message: "Error retrieving meetings" });
  }
};


export const deletingMeeting = async (req: Request, res: Response) => {
  try {
    const  {id}  = req.params as { id: string };
    

    const meeting = await Meeting.findByIdAndDelete(id);
    res.status(200).json({ message: "Meeting deleted successfully", meeting });

  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: "Error deleting meeting" });
  }
}


export const updateMeetingStatus = async (req: Request, res: Response) => {
  try{
    const { id } = req.params as { id: string };
    const { status } = req.body as { status: string };
    const meeting = await Meeting.findByIdAndUpdate(id, { status }, { new: true });

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.status(200).json({ message: "Meeting status updated successfully", meeting });
  } catch (error) {
    console.error("Error updating meeting status:", error);
    res.status(500).json({ message: "Error updating meeting status" });
  }
}

