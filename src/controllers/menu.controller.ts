import { Request, Response } from "express";
import { Menu } from "../models/Menu";
import { Types } from "mongoose";

export const getMenuByRoles = async (req: Request, res: Response) => {
    try {
        const rolesParam = req.query.roles as string;
        if (!rolesParam) {
            return res.status(400).json({ message: "Roles are required" });
        }

        const rolesArray = rolesParam.split(",").map(id => id.trim());

        const menu = await Menu.find({ roles: { $in: rolesArray } });

        return res.json(menu);
    } catch (error) {
        console.error("Error fetching menu:", error);
        return res.status(500).json({ message: "Error fetching menu" });
    }
};

export const createMenu = async (req: Request, res: Response) => {
  try {
    const { title, path, icon, roles } = req.body;
    const menu = new Menu({ title, path, icon, roles });
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error al crear menú", error });
  }
};