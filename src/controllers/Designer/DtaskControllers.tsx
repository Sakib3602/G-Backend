import { MarketingTask } from "../../modules/Marketing/tasks.js";
import type { Request, Response } from "express";
import { getRemainingDate } from "../Marketing/taskController.js";




export const DesignerTasks = async (req: Request, res: Response) => {
    try{
        const { designerId } = req.params as { designerId: string };
        console.log("Designer ID:", designerId); // Debug log to check the received designerId
        const data = await MarketingTask.find({ assignedTo : designerId , status: { $nin: ["completed", "in-progress"] }})
            .populate("makerId", "name")
            .populate("campaignId", "campaignName")
        const mapped = data.map((task) => {
            const remainingDate = getRemainingDate(task.dueDate, task.dueTime);
            return {
                ...task.toObject(),
                remainingDate
            };
        });

        // Return only tasks where remainingDate.isOverdue is false
        const finalData = mapped.filter(item => {
            return item?.remainingDate && item.remainingDate.isOverdue === false;
        });

        console.log("Fetched Tasks (filtered):", finalData);
        res.status(200).json(finalData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching designer tasks", error });
    }
}