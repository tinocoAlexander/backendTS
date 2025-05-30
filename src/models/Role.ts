import { Document, model, Schema, Types } from "mongoose";

export interface IRole extends Document {
    roleId: string;
    type: string;
    createDate: Date;
    deleteDate: Date;
    status: boolean;
}

const roleSchema = new Schema<IRole>({
    roleId: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ["user", "admin"] },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
});

export const Role = model<IRole>("Role", roleSchema, 'roles');