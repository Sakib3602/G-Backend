import { Schema, model } from "mongoose";

export interface ILead {
  leadName: string;
  owner: string;
  status: string;              // e.g., 'New Lead', 'Contacted', etc.
  indications?: string;        // optional
  companyName?: string;        // optional
  leadScore: number;           // converted to number from string
  email?: string;              // optional
  phone?: string;              // optional
  title?: string;              // optional
  specificRole?: string;       // optional
  region?: string;             // optional
  profileUrl?: string;         // optional
  linkedin?: string;           // optional
  leadCreatedBy: string;        // user ID of the creator
  proposalSent?: boolean;        // optional, default to false
  ServiceNeed? : string;   // optional, added for service needs
  assignedToMarketer: string;
  
}

const LeadSchema = new Schema<ILead>(
  {
    leadName: { type: String, required: true },
    owner: { type: String, required: true },
    status: { type: String, default: "New Lead" },
    indications: { type: String, default: "" },
    companyName: { type: String, default: "" },
    leadScore: { type: Number, default: 1 },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    title: { type: String, default: "" },
    specificRole: { type: String, default: "" },
    region: { type: String, default: "US" },
    profileUrl: { type: String, default: "" },
    leadCreatedBy: { type: String, required: true },
    proposalSent: { type: Boolean, default: false },
    ServiceNeed: { type: String,
       enum : ["Graphic","Web","Marketing"],
       default: "Graphic" },  
    assignedToMarketer: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false },
);

export const Lead = model<ILead>("Lead", LeadSchema);
