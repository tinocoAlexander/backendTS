import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    quantity: number;
    price: number;
    createDate: Date;
    deleteDate: Date | null;
    status: boolean;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },
    status: { type: Boolean, default: true } 
});

export const Product = model<IProduct>("Product", productSchema, "products");
