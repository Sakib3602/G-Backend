import { Schema, model , type Types} from "mongoose";

export interface CampaignData{
    campaignName: string,
    channel: string,
    startDate: Date,
    endDate: Date,
    perDayCost: number,
    targetLeads: number,
    totalBudget: number,
    adminApproval?: "pending" | "approved" | "rejected", 
    marketerId: Types.ObjectId,
}

const CampaignSchema = new Schema<CampaignData>({
    campaignName: { type: String, required: true },
    channel: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    perDayCost: { type: Number, required: true },
    targetLeads: { type: Number, required: true },
    totalBudget: { type: Number, required: true },
    adminApproval: { type: String, default: "pending", enum: ["pending", "approved", "rejected"] }, 
    marketerId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}
,{ timestamps: true, versionKey: false },
)

export const Campaign = model("Campaign", CampaignSchema);