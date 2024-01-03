import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface Favorites {
  id: string;
  userId: string;
  productId: string;
}

const prisma = new PrismaClient();

export const getFavorite = async (req: Request, res: Response) => {
  try {
    const favorite: any[] = await prisma.favList.findMany({
      include: {
        User: true,
        Project: true,
        Post: true,
        Service: true,
      },
    });
    res.json(favorite);
  } catch (error) {
    res.json(error);
  }
};




export const addFav = async (req: Request, res: Response) => {
  const { userId, projectId, postId, serviceId } = req.params;
  try {
    let newFav = await prisma.favList.create({
      data: {
        userId: String(userId),
        projectId: String(projectId),
        postId: String(postId),
        serviceId: String(serviceId),
      },
    });
    res.status(200).send("fav item added");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};





export const removeFav = async (req: Request, res: Response): Promise<void> => {
  const userid: number = +req.params.userid;
  const projectid: number = +req.params.projectid;
  const postid: number = +req.params.postid;
  const serviceid: number = +req.params.serviceid;

  try {
    const deleted = await prisma.favList.deleteMany({
      where: {
        userId: String( userid),
        projectId: String (projectid),
        postId: String ( postid),
        serviceId: String ( serviceid),
      },
    });

    res.status(200).send("Favorite item removed successfully");
  } catch (err) {
    res.status(400).send({ error: err as Error });
  }
};