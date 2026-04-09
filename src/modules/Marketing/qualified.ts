import { Schema, model } from "mongoose";

const QualifiedSchema = new Schema({
    leadId : { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    signature: { type: Boolean, default: false },
    createdBy : { type: String, required: true }, // user ID of the creator
    dealFinalLink : { type: String, required: true }, 

},
{ timestamps: true, versionKey: false },
)

export const Qualified = model("Qualified", QualifiedSchema);