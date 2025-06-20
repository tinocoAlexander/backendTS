import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { products, userId } = req.body;

        if (!products || !userId) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        let subtotal = 0;

        // Verificar productos y calcular subtotal
        for (const item of products) {
            const product = await Product.findOne({ _id: item.productId, status: true });

            if (!product) {
                return res.status(404).json({ message: `Producto no disponible o eliminado: ${item.productId}` });
            }

            // Asegurar que el precio viene correcto
            if (typeof item.quantity !== 'number' || typeof item.price !== 'number') {
                return res.status(400).json({ message: `Datos inválidos en el producto: ${item.productId}` });
            }

            subtotal += item.quantity * item.price;
        }

        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        const newOrder = new Order({
            orderId: uuidv4(),
            products,
            userId: new mongoose.Types.ObjectId(userId),
            subtotal,
            total,
            createDate: new Date(),
            deleteDate: null,
            status: "pendiente"
        });

        await newOrder.save();

        return res.status(201).json({ message: "Orden creada exitosamente", order: newOrder });
    } catch (error) {
        console.error("Error al crear la orden:", error);
        return res.status(500).json({ message: "Error interno al crear la orden" });
    }
};

// Obtener todas las órdenes activas
export const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await Order.find({ status: { $ne: "eliminada" } })
            .populate("products.productId")
            .populate("userId");

        return res.json({ orders });
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        return res.status(500).json({ message: "Error interno al obtener órdenes" });
    }
};

// Marcar orden como pagada
export const markOrderAsPaid = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        order.status = "pagada";
        await order.save();

        return res.json({ message: "Orden marcada como pagada" });
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        return res.status(500).json({ message: "Error interno al actualizar la orden" });
    }
};

// Eliminar (lógicamente) una orden
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        order.status = "eliminada";
        order.deleteDate = new Date();
        await order.save();

        return res.json({ message: "Orden eliminada (estado: eliminada)" });
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        return res.status(500).json({ message: "Error interno al eliminar la orden" });
    }
};
