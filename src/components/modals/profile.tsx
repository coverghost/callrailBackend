import { Schema, model } from "mongoose";


export interface Profile {
    _id?: string;
    aboutUs: string;
    note: string;
    phoneNumber: string;
    appImage: string;
    dashboardImage: string;
    userId: string;
    password: string;
    createdAt: Date;
}

const ProfileSchema = new Schema<Profile>({
    aboutUs: { type: String, required: true, default: "" },
    note: { type: String, required: true, default: "" },
    phoneNumber: { type: String, required: false, default: "" },
    appImage: { type: String, required: false, default: "" },
    dashboardImage: { type: String, required: false, default: "" },
    userId: { type: String, required: false, default: "" },
    password: { type: String, required: false, default: "" },
    createdAt: { type: Date, default: Date.now() },
});
export const Profile = model<Profile>('Profile', ProfileSchema);