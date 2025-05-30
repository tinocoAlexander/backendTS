import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import dayjs from "dayjs";
import {User} from "../models/User";
import bcrypt from "bcryptjs";

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

    const accessToken = generateAccessToken(user.id);
    cache.set(user.id, accessToken, 30 * 60); // 30 minutos

    return res.json({ accessToken });
};

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
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLife,
        expTime
    });
};

export const updateToken = (req: Request, res: Response): Response => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const newTimeTtl: number = 60 * 15;
    cache.ttl(userId, newTimeTtl);

    return res.json({
        message: "Tiempo de vida del token actualizado"
    });
};

export const getAllUsers = async(req: Request, res: Response): Promise<Response> => {
    const {userEmail} = req.query;
    const userList = await User.find();
    const userByEmail = await User.find({email:userEmail});

    console.log("userByEmail", userByEmail);

    return res.json({
        userList
    });
};

export const saveUser = async (req: Request, res: Response) => {
    try {
        const { nombre, email, password, role, phone } = req.body;

        if (!nombre || !email || !password || !role || !phone) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario con este correo ya existe" });
        }

        // Encriptar la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            nombre, 
            email, 
            password: hashedPassword, 
            role, 
            phone, 
            createDate: new Date(), 
            status: true 
        });

        await newUser.save();

        return res.status(201).json({ message: "Usuario creado exitosamente" });
    }
    catch (error) {
        console.error("Error al guardar el usuario:", error);
        return res.status(500).json({ message: "Error al guardar el usuario" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { password, role, nombre, phone, email } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Solo actualiza los campos que vienen en el body
        if (nombre) user.nombre = nombre;
        if (email) user.email = email;
        if (role) user.role = role;
        if (phone) user.phone = phone;

        if (password) {
            // Encriptar la nueva contraseña solo si se proporciona
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        return res.json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error al actualizar el usuario" });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        status: false; // Cambia el estado del usuario a inactivo
        await User.findByIdAndUpdate(userId, { status: false });

        return res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ message: "Error al eliminar el usuario" });
    }
}