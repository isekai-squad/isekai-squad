import { $Enums, Prisma } from "@prisma/client";
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import * as crypto from "crypto";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Student {
  id: string;
  name: string;
  userName: string;
  email: string;
  specialty?: string | null;
  location?: string | null;
  forgotPassword: string | null | Function;
  bio?: string | null;
  dateOfBirth?: string | null;
  password?: string | null;
  pdp?: string | null;
  number?: number | null;
  cover?: string | null;
  socials?: Prisma.UserCreatesocialsInput | string[] | null;
  active: boolean;
  premuim: boolean;
  role: string;
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
        const { email, password,role } = req.body;
        
        if (!email || !password || !role
            ) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        const user = await prisma.user.findUnique({
            where: { email, role },
        });

        if (!user) {
            
            
            return res.status(404).json({ error: 'User not found' });
            
        }
        
        const storedPassword = user.password;
        
        if (!storedPassword) {
            return res.status(500).json({ error: 'User record does not have a password' });
        }

    if (typeof password !== "string") {
      return res.status(400).json({ error: "Invalid password format" });
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
        "secretKey"
      );

      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
console.log(userId);
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const updateData = req.body; 

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cleanUpdateData = Object.entries(updateData).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key as string] = value;
        }
        return acc;
      },
      {} as Record<string, any>
    );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: cleanUpdateData,
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const forgotPass = async (req: Request, res: Response) => {
  const { email } = req.body;
  const code = crypto.randomUUID().slice(0, 6).toString();
  try {
    const updatedUser: Student | null = await prisma.user.update({
      where: { email: email },
      data: { forgotPassword: code },
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "haddadaahmed9@gmail.com",
        pass: "wlpd vkxo mkfz cztg",
      },
    });

    let info = await transporter.sendMail({
      from: "haddadaahmed9@gmail.com",
      to: email,
      subject: "ISEKAI FORGOTTEN PASSWORD",
      text: "Hey you forgot your Password ?",
      html: `
                <body
                style="
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                "
                >
                <div
                style="
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                "
                >
                <div style="text-align: center; margin-bottom: 20px">
                <img
                src="https://res.cloudinary.com/dc1cdbirz/image/upload/v1702251251/LOGO_eby6nq.png"
                alt="Your Logo"
                style="max-width: 100%; height: auto"
                />
                </div>
                
                <div style="text-align: center">
                <h2>Welcome to Eventyrium!</h2>
                
                <p>
                Here is your code ${code} 
                </p>
                
                
                
                </div>
                </div>
                </body>
                `,
    });
  } catch (err) {
    console.log(err);
  }
};

export const SubmitForgotPassword = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user?.forgotPassword === code) {
      res.status(200).json("success");
    } else {
      res.status(400).json("Wrong Code");
    }
  } catch (err) {
    res.json(err);
  }
};

export const ChangePassword = async (req: Request, res: Response) => {
  const { newPassword, email } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const user = await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
    res.status(200).json("success");
  } catch (err) {
    res.json(err);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        Technologies: { select: { name: true, image: true } },
        specialty: { select: { name: true } },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: {
        Technologies: { select: { name: true, image: true } },
        specialty: { select: { name: true } },
        project:true,
        posts:true
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
