import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllNotificationsForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const notifications = await prisma.notifications.findMany({
      where: { userId: userId },
      include: {
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
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
