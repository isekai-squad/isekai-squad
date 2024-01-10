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
  const serviceid: string = req.params.serviceid;

  try {
    const deleted = await prisma.favList.deleteMany({
      where: {
        serviceId: serviceid,
      },
    });

    // Add response handling if needed
    res.status(200).json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting from basket:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};