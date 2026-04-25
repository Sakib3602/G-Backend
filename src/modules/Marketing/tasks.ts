import { Schema, model , type Types} from "mongoose";

type tasksData = {
    title: string,
    description: string,
    assignedTo: Types.ObjectId,
    dueDate: Date,
    status: "pending" | "in-progress" | "completed",
    percentageCompleted?: number,
    dueTime: string,
    priority: "Low" | "Medium" | "High" ,
    campaignId: Types.ObjectId, 
    makerId: Types.ObjectId
    
}

const TaskSchema = new Schema<tasksData>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, default: "pending", enum: ["pending", "in-progress", "completed"] },
    percentageCompleted: { type: Number, default: 0 },
    dueTime: { type: String, required: true },
    priority: { type: String, default: "Low", enum: ["Low", "Medium", "High"] },
    campaignId: { type: Schema.Types.ObjectId,  ref: "Campaign", required: true },
    makerId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, 
{ timestamps: true, versionKey: false })

export const MarketingTask = model("MarketingTask", TaskSchema);
