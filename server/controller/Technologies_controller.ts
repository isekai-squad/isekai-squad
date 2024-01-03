import { PrismaClient } from "@prisma/client";
import { Response , Request } from "express";

const prisma = new PrismaClient();

export const addNewTechnology = async (req: Request, res: Response) => {
     let {name , image} = req.body; 
     try {
        const result = await prisma.technologies.create({
            data : {
                name,
                image
            }
        })
     }catch (err) {
         console.error(err)
         res.status(400).send(err)
     }
}

export const deleteTechnology = async (req: Request, res: Response) => {

}