import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllNotificationsForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { to } = req.params;

    const notifications = await prisma.notifications.findMany({
      where: { to },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            pdp:true
          },
        },
      },
      orderBy : {
        created_at : 'desc'
      } , 
    });


    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
export const updateNotificationsSeenForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { notificationId } = req.params;

    const notifications = await prisma.notifications.update({
      where: { id: notificationId },
      data: { seen: true },
    });

    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};


export const addNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await prisma.notifications.create({
      data: req.body
       
    })
    res.status(201).send(result)
  }catch (err) {
    res.status(500).send("Internal Server Error");
  }
}