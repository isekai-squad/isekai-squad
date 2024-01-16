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
  const { userId, serviceId } = req.body;
  console.log(serviceId );
  
  try {
    let newFav = await prisma.favList.create({
      data: {
        userId: userId,
        serviceId: serviceId,
      },
    });
    res.status(200).send("fav item added");
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

export const addToBasket = async (req: Request, res: Response) => {
  try {
    const userId = req.params.idUser;
    const serviceId = req.params.idItem;
    
    const item = await prisma.basket.create({
      data: {
        userId: userId,
        serviceId:serviceId,
      },
      
    });
    res.status(201).send("successful");
  } catch(error) {
    console.log(error);
    
    res.status(404).send(error);
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

    
    res.status(200).json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting from basket:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};