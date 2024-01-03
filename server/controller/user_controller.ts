import { Prisma } from "@prisma/client";
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Student {
    id: string,
    name: string,
    userName: string,
    email: string,
    specialty?: string | null,
    location?: string | null,
    bio?: string | null,
    dateOfBirth?: string | null,
    password?: string | null,
    pdp?: string | null,
    number?: number | null,
    cover?: string | null,
    socials?: Prisma.UserCreatesocialsInput | string[] | null,
    active: boolean,
    premuim: boolean,
    role: string,
}

export const createUser = async (req: Request, res: Response) => {
    const body = req.body as Student;

    try {
        // Check if a password is provided
        if (body.password) {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;
        }

        const student = await prisma.user.create({
            data: body as Prisma.UserCreateInput,
        });

        res.json(student);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error creating user");
    }
};



export const SignIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const storedPassword = user.password;

        if (!storedPassword) {
            return res.status(500).json({ error: 'User record does not have a password' });
        }

        if (typeof password !== 'string') {
            return res.status(400).json({ error: 'Invalid password format' });
        }

        const isMatch = await bcrypt.compare(password, storedPassword);

        if (isMatch) {
            const token = jwt.sign(
                {
                    userName: user.userName,
                    pdp: user.pdp,
                    cover: user.cover,
                    role: user.role,
                    name: user.name,
                    id: user.id,
                },
                'secretKey'
            );

            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId 

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const updateData = req.body; // Object containing fields to update

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cleanUpdateData = Object.entries(updateData).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key as string] = value;
            }
            return acc;
        }, {} as Record<string, any>);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: cleanUpdateData,
        });

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const forgotPass = (req:Request,res:Response)=>{
    const code = crypto.randomUUID().slice(0,6).toString
    try{
        const User = prisma.user.update({where: {email:req.body.email})

    }catch(err){
        console.log(err);
        
    }
}

