import { PrismaClient } from "@prisma/client"
import { Response , Request} from "express"

const prisma = new PrismaClient();

export const addService = async (req : Request , res : Response) => {
    let {userId} = req.params
    let {title , description , image , Price ,category} = req.body
    try {
        const result = await prisma.service.create( {
            data: {
                title,
                description,
                image,
                Price,
                category,
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

export const upVoteService = async (req : Request , res : Response) => {
    let {serviceId , userId} = req.params
    try {
        let user = await prisma.likes.findFirst({
            where : {
                userId
            }
        })

        if (user) {
            await prisma.likes.deleteMany({
                where : {
                    userId,
                    serviceId
                }
            })
            res.status(200).send({
                message : "deleted"
            })
        }else {
            const result =  await prisma.likes.create({
                data : {
                    like : 1,
                    serviceId,
                    userId
                }
            })
            res.status(201).json(result)
        }
    }catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
}


export const downVoteService = async (req : Request, res : Response) => {
    let {serviceId, userId} = req.params
    try {
        let user = await prisma.likes.findFirst({
            where : {
                userId
            }
        })
        if (user) {
            await prisma.likes.deleteMany({
                where : {
                    userId,
                    serviceId
                }
            })
            res.status(200).send({
                message : "deleted"
            })
        }else {
            const result =  await prisma.likes.create({
                data : {
                    like : 0,
                    serviceId,
                    userId
                }
            })
            res.status(201).json(result)
        }

    }catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
}


export const getAllLikesService = async (req : Request , res:Response) => {
    let {serviceId} = req.params
    try {
        const result = await prisma.likes.findMany({
            where : {serviceId}
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}