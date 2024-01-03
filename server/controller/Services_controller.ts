import { PrismaClient } from "@prisma/client"
import { Response , Request} from "express"

const prisma = new PrismaClient();

export const addService = async (req : Request , res : Response) => {
    let {userId} = req.params
    let {title , description , image , Price} = req.body
    try {
        const result = await prisma.service.create( {
            data: {
                title,
                description,
                image,
                Price,
                userId
            }
        })
        res.status(201).json(result)
    }catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
}

export const getAllServices = async (req :Request , res : Response) => {
    try {
        const result = await prisma.service.findMany()
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getAllServicesOneUser = async (req : Request , res : Response) => {
    let {userId} = req.params
    try {
        const result = await prisma.service.findMany({
            where : {userId}
        })
        res.status(200).json(result)
    }catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const deleteService = async (req : Request , res : Response) => {
    let {serviceId , userId} = req.params
    try {
        const result = await prisma.service.delete({
            where : {id : serviceId, userId}
        })
        res.status(200).json(result)
    }catch (err)  {
        console.log(err)
        res.status(400).send(err)
    }
}

export const updateService = async (req : Request , res : Response) => {
    let {serviceId , userId} = req.params
    try {
        const result = await prisma.service.update({
            where : {id : serviceId, userId},
            data : req.body
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}