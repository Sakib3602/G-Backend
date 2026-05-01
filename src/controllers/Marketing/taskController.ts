import type { Request, Response } from "express";
import { Campaign } from "../../modules/Marketing/campaign.js";
import { User } from "../../modules/User.js";
import { MarketingTask } from "../../modules/Marketing/tasks.js"

export const getRemainingDate = (dueDateValue: Date | string, dueTime?: string) => {
    const now = new Date();
    const dueDate = new Date(dueDateValue);

    const parts = (dueTime ?? "").split(":");
    const parsedHours = Number(parts[0]);
    const parsedMinutes = Number(parts[1]);

    const hours = Number.isInteger(parsedHours) ? parsedHours : 23;
    const minutes = Number.isInteger(parsedMinutes) ? parsedMinutes : 59;

    dueDate.setHours(hours, minutes, 0, 0);

    const diffMs = dueDate.getTime() - now.getTime();
    const absMs = Math.abs(diffMs);

    const dayMs = 24 * 60 * 60 * 1000;
    const hourMs = 60 * 60 * 1000;
    const minuteMs = 60 * 1000;

    return {
        dueDateTime: dueDate,
        isOverdue: diffMs < 0,
        milliseconds: diffMs,
        days: Math.floor(absMs / dayMs),
        hours: Math.floor((absMs % dayMs) / hourMs),
        minutes: Math.floor((absMs % hourMs) / minuteMs),
        dueTimeWithDayAndHour: `${Math.floor(absMs / dayMs)} day ${Math.floor((absMs % dayMs) / hourMs)} hour`
    };
};

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

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const { marketerId } = req.params as { marketerId: string };
        const data = await MarketingTask.find({ makerId : marketerId , status : {$ne: "completed"}})
            .populate("makerId", "name")
            .populate("campaignId", "campaignName")
            .populate("assignedTo", "name email");

        const tasksWithRemainingDate = data.map((task) => {
            const remainingDate = getRemainingDate(task.dueDate, task.dueTime);
            return {
                ...task.toObject(),
                remainingDate
            };
        });

        res.status(200).json(tasksWithRemainingDate);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
}


export const createTask = async (req: Request, res: Response) => {
    try{

        const body = req.body;
        const task = await MarketingTask.create(body);
        const remainingDate = getRemainingDate(task.dueDate, task.dueTime);

        res.status(201).json({
            ...task.toObject(),
            remainingDate
        });
        
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
}




// ============================Designer Tasks ============================
// export const DesignerTasks = async (req: Request, res: Response) => {
//     try{
//         const { designerId } = req.params as { designerId: string };
//         console.log("Designer ID:", designerId); // Debug log to check the received designerId
//         const data = await MarketingTask.find({ assignedTo : designerId , status: { $nin: ["completed", "in-progress"] }})
//             .populate("makerId", "name")
//             .populate("campaignId", "campaignName")
//         const mapped = data.map((task) => {
//             const remainingDate = getRemainingDate(task.dueDate, task.dueTime);
//             return {
//                 ...task.toObject(),
//                 remainingDate
//             };
//         });

//         // Return only tasks where remainingDate.isOverdue is false
//         const finalData = mapped.filter(item => {
//             return item?.remainingDate && item.remainingDate.isOverdue === false;
//         });

//         console.log("Fetched Tasks (filtered):", finalData);
//         res.status(200).json(finalData);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching designer tasks", error });
//     }
// }

// export const 