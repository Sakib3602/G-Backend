import { Schema, model, type Types } from "mongoose";

export interface IMeeting {
  title: string;
  leadId?: Types.ObjectId;
  clientName: string;
  clientEmail: string;
  meetingDate: string;
  meetingTime: string;
  meetingType: "online" | "offline";
  meetingLink?: string;
  agenda?: string;
  notes?: string;
  status?: "scheduled" | "completed" | "cancelled";
  schedulerId: string;
 
}

const meetingSchema = new Schema<IMeeting>(
  {
    title: {
      type: String,
      required: true,
    },

    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
    },

    clientName: {
      type: String,
      required: true,
    },

    clientEmail: {
      type: String,
      required: true,
    },

    meetingDate: {
      type: String,
      required: true,
    },

    meetingTime: {
      type: String,
      required: true,
    },

    meetingType: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    meetingLink: {
      type: String,
    },

    agenda: {
      type: String,
    },

    notes: {
      type: String,
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    schedulerId: {
      type: String,
      required: true,
    },

  },
  { timestamps: true, versionKey: false },
);

export const Meeting = model<IMeeting>("Meeting", meetingSchema);
