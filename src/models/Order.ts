import { Document, model, Schema, Types } from "mongoose";

export interface IOrder extends Document {
    orderId: string;
    userId: string;
    total: number;
    subtotal: number;
    createDate: Date;
    deleteDate: Date | null;
    status: boolean;
}

const orderSchema = new Schema<IOrder>({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },
    status: { type: Boolean, default: true }
});

export const Order = model<IOrder>("Order", orderSchema, 'orders');