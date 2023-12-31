import { PrismaClient } from "@prisma/client"
import { Response , Request} from "express"

const prisma = new PrismaClient();


export const addProject  = async (req : Request , res : Response) => {
    let {userId} = req.params
    let {title , description , content , images} = req.body
    try {
      const result = await prisma.project.create({
            data : {
                title,
                description,
                content,
                images,
                userId,
            }
        })
        res.status(201).json(result)
    }catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
}

export const upVoteProject = async (req : Request , res : Response) => {
    let {projectId, userId} = req.params
    try {
        const user = await prisma.likes.findFirst(
            {
                where : {
                    userId
                }
        }
        )
        if (user) {
             await prisma.likes.deleteMany({
                where : {
                                  userId,
                                  projectId
                                }
            })  
            res.status(200).send({
                message : "deleted"
            })
        }else {
            const result = await prisma.likes.create({
                data : {
                    like : 1,
                    projectId,
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


export const downVoteProject = async (req :Request , res:Response) => {
    let {projectId, userId} = req.params
    try {
        const user = await prisma.likes.findFirst({where: 
            {
                userId
            }
        })
        if (user) {
            await prisma.likes.deleteMany({
                where : {
                    userId,
                    projectId
                }
            })
            res.status(200).send({
                message : "deleted"
            })
        }else {
        const result =  await prisma.likes.create({
                data : {
                    like : 0,
                    projectId,
                    userId
                }
            })
            res.status(201).json(result)
        }
    }catch(err) {
        console.log(err)
        res.status(401).send(err)
    }
}

export const addPost = async (req : Request , res : Response) => {
    let {userId} = req.params
    let {title , content , images} = req.body
    try {
        const result = await prisma.post.create( {
            data : {
                title,
                content,
                images,
                userId
            }
        })
        res.status(201).json(result)
    }catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
}

export const getAllProject = async (req : Request , res : Response) => {
    try {
        const result = await prisma.project.findMany()
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getAllProjectOneUser = async (req : Request , res :Response) => {
    let {userId} = req.params
    try {
        const result = await prisma.project.findMany({
            where : {userId},
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getAllPosts = async (req : Request , res : Response) => {
    try {
        const result = await prisma.project.findMany()
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const getAllPostsOneUser = async (req : Request , res : Response) => {
    let {userId} = req.params
    try {
        const result = await prisma.post.findMany({
            where : {userId}
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const upVotePost = async (req : Request , res : Response) => {
    let {postId, userId} = req.params
    try {
        const user = await prisma.likes.findFirst(
            {
                where : {
                    userId
                }
        }
        )
        if (user) {
             await prisma.likes.deleteMany({
                where : {
                                  userId,
                                  postId
                                }
            })  
            res.status(200).send({
                message : "deleted"
            })
        }else {
            const result = await prisma.likes.create({
                data : {
                    like : 1,
                    postId,
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

export const downVotePost = async (req : Request, res : Response) => {
    let {postId , userId} = req.params
    try {
        const user = await prisma.likes.findFirst({
            where : {
                userId
            }
        })
        if (user) {
            await prisma.likes.deleteMany({
                where : {
                    userId,
                    postId
                }
            })
            res.status(200).send({
                message : "deleted"
            })
        }else {
            const result =  await prisma.likes.create({
                data : {
                    like : 0,
                    postId,
                    userId
                }
            })
            res.status(201).json(result)
        }
    }catch(err) {
        console.log(err)
        res.status(401).send(err)
    }
}

export const deleteProject = async (req : Request , res : Response) => {
    let {userId , projectId} = req.params
    try {
        const result = await prisma.project.delete({
            where : {id : projectId , userId}
        })
        res.status(200).json(result)
    }catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const updateProject = async (req : Request , res :Response) => {
    let {userId , projectId} = req.params
    try {
        const result = await prisma.project.update({
            where : {id : projectId, userId},
            data : req.body
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const deletePost = async (req : Request , res : Response) => {
    let {userId , postId} = req.params
    try {
        const result = await prisma.post.delete({
            where : {id : postId, userId}
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export const updatePost = async (req : Request , res : Response) => {
    let {userId , postId} = req.params
    try {
        const result = await prisma.post.update({
            where : {id : postId, userId},
            data : req.body
        })
        res.status(200).json(result)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}



export const getAllLikesPosts = async (req : Request , res : Response) => {
    let {postId} = req.params 
    try {
        const likes = await prisma.likes.findMany({
            where : {postId}
        })
        res.status(200).json(likes)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}


export const getAlllLikesProject = async (req : Request , res : Response) => {
    let {projectId} = req.params
    try {
        const likes = await prisma.likes.findMany({
            where : {projectId}
        })
        res.status(200).json(likes)
    }catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}