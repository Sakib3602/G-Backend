import { Schema, model } from "mongoose";

export interface ILead {
  leadName: string;
  email: string;
  phone?: string;
  profileUrl?: string;
  CompanyName?: string;
  Region?: string;
  Title?: string;
  SpecificRole?: string;
  Owner: string;
  Status: string;
  Indications?: string;
  LeadScore?: number;
}

const LeadSchema = new Schema<ILead>(
  {
    leadName: { type: String, required: true },
    Owner: { type: String, required: true },
    Status: { type: String, default: "New Lead" },
    Indications: { type: String, default: "" },
    CompanyName: { type: String, default: "" },
    LeadScore: { type: Number, default: 1 },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    Title: { type: String, default: "" },
    SpecificRole: { type: String, default: "" },
    Region: { type: String, default: "US" },
    profileUrl: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false },
);

export const LeadModel = model<ILead>("Lead", LeadSchema);
