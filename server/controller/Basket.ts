import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addToBasket = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const serviceId = req.params.serviceId;
    const checkService = await prisma.basket.findFirst({
      where: { userId: userId, serviceId: serviceId },
    });

    if (!checkService) {
      const item = await prisma.basket.create({
        data: {
          userId: userId,
          serviceId: serviceId,
        },
      });
      res.status(201).send("successful");
    } else {
      res.status(201).send("this service is already added to the basket");
    }
  } catch {
    res.status(404).send("failed");
  }
};

export const getBasket = async (req: Request, res: Response) => {
  try {
    const baskets = await prisma.basket.findMany({
      where: { userId: req.params.id, payed: false },
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
export const getBayBasket = async (req: Request, res: Response) => {
  try {
    const baskets = await prisma.basket.findMany({
      where: { userId: req.params.id, payed: true },
      include: {
        User: false,
        Service: false,
      },
    });
    res.send(baskets);
  } catch (error) {
    res.status(404).send(error);
  }
};


export const payedBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, serviceId } = req.body;
  try {
    const payed = await prisma.basket.updateMany({
      where: { userId: userId, serviceId: serviceId },
      data: { payed: true },
    });

    res.status(200).send("Item payed from basket");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
export const deleteBasket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { idUser, idItem } = req.params;
  try {
    const deleted = await prisma.basket.deleteMany({
      where: { userId: idUser, serviceId: idItem },
    });
    res.status(200).send("Item deleted from basket");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

