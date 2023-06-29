import { Schema, model } from "mongoose";


export interface UserContact {
    _id?: string;
    stationId: string;
    name: string;
    number: string;
    createdAt: Date;
}

const UserContactSchema = new Schema<UserContact>({
    stationId: { type: String, required: false, default: "" },
    number: { type: String, required: true, unique:true },
    name: { type: String, required: false, default: "" },
    createdAt: { type: Date, default: Date.now() },
});
export const UserContact = model<UserContact>('UserContact', UserContactSchema);
