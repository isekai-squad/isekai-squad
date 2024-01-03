import { PrismaClient } from "@prisma/client"
import { Response , Request} from "express"

const prisma = new PrismaClient();

export const addreport = async (req: Request, res: Response) => {
    let {userId} = req.params
    let {category , evidence} = req.body
    try {
        const result = await prisma.report.create({
            data : {
                category,
                evidence,
                userId
            }
        })
        res.status(201).json(result)
    }catch (err) {
        console.error(err)
        res.status(401).send(err)
    }
}


export const getAllreport = async (req: Request, res: Response) => {
    try {
        const result = await prisma.report.findMany()
        res.status(200).json(result)
    }catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
}


export const getAllreportOneUser = async (req: Request, res: Response) => {
    let {userId} = req.params
    try {
        const result = await prisma.report.findMany({
            where : {userId}
        })
        res.status(200).json(result)
    }catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
}
