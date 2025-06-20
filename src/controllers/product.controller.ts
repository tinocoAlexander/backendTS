import { Request, Response } from "express";
import { Product } from "../models/Product";

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const {name, description, quantity, price } = req.body;

        if (!name || !description || quantity == null || price == null) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const newProduct = new Product({
            name,
            description,
            quantity,
            price,
            createDate: new Date(),
            status: true
        });

        await newProduct.save();

        return res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
    } catch (error) {
        console.error("Error al crear producto:", error);
        return res.status(500).json({ message: "Error interno al crear producto" });
    }
};

// Obtener todos los productos activos
export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find({ status: true });
        return res.json({ products });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({ message: "Error interno al obtener productos" });
    }
};

// Obtener un producto por ID de Mongo
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product || product.status === false) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.json({ product });
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return res.status(500).json({ message: "Error interno al obtener producto" });
    }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, quantity, price } = req.body;

        const product = await Product.findById(id);
        if (!product || product.status === false) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (quantity != null) product.quantity = quantity;
        if (price != null) product.price = price;

        await product.save();

        return res.json({ message: "Producto actualizado correctamente", product });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return res.status(500).json({ message: "Error interno al actualizar producto" });
    }
};

// Eliminar producto lógicamente
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if (!product || product.status === false) {
            return res.status(404).json({ message: "Producto no encontrado o ya eliminado" });
        }

        product.status = false;
        product.deleteDate = new Date();

        await product.save();

        return res.json({ message: "Producto eliminado (lógicamente)" });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return res.status(500).json({ message: "Error interno al eliminar producto" });
    }
};
