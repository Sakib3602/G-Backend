import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  createdAt: Date;
  img?: string | null;
  role?: string;
  phone?: string | null;
  address?: string | null;
  job_title?: string | null;
  department?: string | null;
  hire_date?: Date | null;
  NID?: string | null;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    img: { type: String, default: null },
    role: { type: String, default: "user" },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    job_title: { type: String, default: null },
    department: { type: String, default: null },
    hire_date: { type: Date, default: null },
    NID: { type: String, default: null },
  },

  { timestamps: true, versionKey: false },
);

export const User = model<IUser>("User", userSchema);
