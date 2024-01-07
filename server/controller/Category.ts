import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addCategory = async (req  : Request , res : Response) => {
    let {name , image} = req.body
    try {
        const result = await prisma.forum_Category.create({
            data:{
                name,
                image,
            }
        })
        res.status(201).json(result)
    }catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const getAllCategory = async (req  : Request, res : Response) => {
    try {
        const result = await prisma.forum_Category.findMany()
        res.status(200).json(result)
    }catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}
