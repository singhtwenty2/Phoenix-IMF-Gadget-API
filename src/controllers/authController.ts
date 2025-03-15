import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const prisma = new PrismaClient();

export class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const { username, password, role } = req.body;

            const existingUser = await prisma.user.findUnique({
                where: { username }
            });

            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    role: role || 'agent'
                }
            });

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                config.jwtSecret
            );

            res.status(201).json({
                message: 'User registered successfully',
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Registration failed' });
        }
    };

    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await prisma.user.findUnique({
                where: { username }
            });

            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                config.jwtSecret
            );

            res.json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            res.status(500).json({ error: 'Login failed' });
        }
    };
}