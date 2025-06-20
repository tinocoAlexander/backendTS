import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

// 🔐 LOGIN
export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "El usuario y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email: username });
    if (!user) {
        return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const accessToken = generateAccessToken({ userId: user.id, roles: user.roles });
    cache.set(user.id, accessToken, 30 * 60); // 30 minutos

    return res.json({ accessToken });
};

// ⏱️ TIEMPO DEL TOKEN
export const getTimeToken = (req: Request, res: Response): Response => {
    const userId = req.query.userId as string;

    if (!userId) {
        return res.status(400).json({ message: "Falta el parámetro userId en la query" });
    }

    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const now = Date.now();
    const timeToLife = Math.floor((ttl - now) / 1000);
    const expTime = dayjs(ttl).format("HH:mm:ss");

    return res.json({ timeToLife, expTime });
};

// 🔁 RENOVAR TOKEN
export const updateToken = (req: Request, res: Response): Response => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const newTimeTtl: number = 60 * 15;
    cache.ttl(userId, newTimeTtl);

    return res.json({ message: "Tiempo de vida del token actualizado" });
};

// 📋 OBTENER USUARIOS
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const { userEmail } = req.query;
    const userList = await User.find();
    const userByEmail = await User.find({ email: userEmail });

    console.log("userByEmail", userByEmail);

    return res.json({ userList });
};

// 🆕 REGISTRAR USUARIO
export const saveUser = async (req: Request, res: Response) => {
    try {
        const { nombre, email, password, roles, phone } = req.body;

        if (!nombre || !email || !password || !roles || !phone || !Array.isArray(roles) || roles.length === 0) {
            return res.status(400).json({ message: "Faltan datos obligatorios o roles inválidos" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario con este correo ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            nombre,
            email,
            password: hashedPassword,
            roles,
            phone,
            createDate: new Date(),
            status: true
        });

        await newUser.save();

        return res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
        return res.status(500).json({ message: "Error al guardar el usuario" });
    }
};

// 🔄 ACTUALIZAR USUARIO
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { password, roles, nombre, phone, email } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (nombre) user.nombre = nombre;
        if (email) user.email = email;
        if (Array.isArray(roles)) user.roles = roles;
        if (phone) user.phone = phone;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        return res.json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};

// ❌ ELIMINAR USUARIO (LÓGICO)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.status = false;
        await user.save();

        return res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
};
