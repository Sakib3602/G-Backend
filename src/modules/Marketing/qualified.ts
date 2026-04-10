import { Schema, model , type Types} from "mongoose";


export interface QualifiedData{
    leadId: Types.ObjectId,
    signature: boolean,
    createdBy: Types.ObjectId,
    dealFinalLink: string,
    assignedToMarketer?: string,
    sendDetailsToSign?: boolean
}


const QualifiedSchema = new Schema<QualifiedData>({
    leadId : { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    signature: { type: Boolean, default: false },
    createdBy : { type: Schema.Types.ObjectId, ref: "User", required: true }, // user ID of the creator
    dealFinalLink : { type: String, required: true },
    assignedToMarketer: { type: String, default: "" },
    sendDetailsToSign : { type: Boolean, default: false }, 
},
{ timestamps: true, versionKey: false },
)


export const Qualified = model("Qualified", QualifiedSchema);
