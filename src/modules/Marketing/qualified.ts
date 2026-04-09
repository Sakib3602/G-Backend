import { Schema, model , type Types} from "mongoose";


export interface QualifiedData{
    leadId: Types.ObjectId,
    signature: boolean,
    createdBy: string,
    dealFinalLink: string,
    sendDetailsToSign?: boolean
}


const QualifiedSchema = new Schema<QualifiedData>({
    leadId : { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    signature: { type: Boolean, default: false },
    createdBy : { type: String, required: true }, // user ID of the creator
    dealFinalLink : { type: String, required: true },
    sendDetailsToSign : { type: Boolean, default: false }, 
},
{ timestamps: true, versionKey: false },
)


export const Qualified = model("Qualified", QualifiedSchema);
