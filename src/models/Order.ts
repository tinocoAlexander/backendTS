import { Document, model, Schema, Types } from "mongoose";

export interface IOrder extends Document {
    orderId: string;
    products: {
        productId: Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    userId: Types.ObjectId;
    total: number;
    subtotal: number;
    createDate: Date;
    deleteDate: Date | null;
    status: "pendiente" | "pagada" | "eliminada";
}

const orderSchema = new Schema<IOrder>({
    orderId: { type: String, required: true, unique: true },
    products: [{
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    userId: { type: Types.ObjectId, ref: "User", required: true },
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },
    status: {
        type: String,
        enum: ["pendiente", "pagada", "eliminada"],
        default: "pendiente"
    }
});

export const Order = model<IOrder>("Order", orderSchema, "orders");
