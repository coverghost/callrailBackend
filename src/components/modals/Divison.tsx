import { Schema, model } from "mongoose";


export interface Division {
    _id?: string;
    lobbyId:string;
    code:string;
    name: string;
    createdAt: Date;
}

const DivisionSchema = new Schema<Division>({
    lobbyId: { type: String, required: true, default: "" },
    code: { type: String, required: true, default: "" },
    name: { type: String, required: false, default: "" },
    createdAt: { type: Date, default: Date.now() },
});
export const Division = model<Division>('Division', DivisionSchema);