import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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

export const getBasket = async (req: Request, res: Response) => {
  try {
    const baskets = await prisma.basket.findMany({
      where: { userId:  req.params.id },
      include: {
        User: true,
        Service: true,
      },
    });
    res.send(baskets);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { idUser, idItem } = req.params;
  try {
    const deleted = await prisma.basket.deleteMany({
      where: { userId: (idUser), serviceId: (idItem) },
    });
    res.status(200).send("Item deleted from basket");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
