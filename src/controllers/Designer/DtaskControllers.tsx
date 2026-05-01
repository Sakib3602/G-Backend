import { MarketingTask } from "../../modules/Marketing/tasks.js";
import type { Request, Response } from "express";
import { getRemainingDate } from "../Marketing/taskController.js";




export const DesignerTasks = async (req: Request, res: Response) => {
    try{
        const { designerId } = req.params as { designerId: string };
        console.log("Designer ID:", designerId); 
        const data = await MarketingTask.find({ assignedTo : designerId , status: "pending"})
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

export const runningDesignerTasks = async (req: Request, res: Response) => {
    try{
        const { designerId } = req.params as { designerId: string };
        const data = await MarketingTask.find({ assignedTo : designerId , status: "in-progress"})
            .populate("makerId", "name")
            .populate("campaignId", "campaignName")

         const mapped = data.map((task) => {
            const remainingDate = getRemainingDate(task.dueDate, task.dueTime);
            return {
                ...task.toObject(),
                remainingDate
            };
        });
        console.log("Fetched In-Progress Tasks:", mapped);

        res.status(200).json(mapped);
    } catch (error) {
        res.status(500).json({ message: "Error fetching in-progress designer tasks", error });
    }
}

export const changeStatus = async (req: Request, res: Response) => {
    try{
        const { taskId } = req.params as { taskId: string };
        const { status } = req.body as { status: string };

        const data = await MarketingTask.findByIdAndUpdate({ _id: taskId }, { status }, { new: true });
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "Error changing task status", error });
    }
}


export const progressUpdate = async (req: Request, res: Response) => {
    try{
        const { taskId } = req.params as { taskId: string };
        const { percentageCompleted } = req.body as { percentageCompleted: number };
        console.log("Updating Task Progress:", { taskId, percentageCompleted });
        const data = await MarketingTask.findByIdAndUpdate({ _id: taskId }, { percentageCompleted }, { new: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error updating task progress", error });
    }
}