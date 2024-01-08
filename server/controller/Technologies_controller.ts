import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const getAllTechno = async (req: Request, res: Response) => {
  try {
    const result = await prisma.technologies.findMany({
      where: { userId: null, projectId: null },
      select: {
        name: true,
        image: true,
      },
    });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
export const addNewTechnology = async (req: Request, res: Response) => {
  let { name, image } = req.body;
  try {
    const result = await prisma.technologies.create({
      data: {
        name,
        image,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

export const deleteTechnology = async (req: Request, res: Response) => {};

export const addUserTechnology = async (req: Request, res: Response) => {
  let { data } = req.body;
  const { id } = req.params;
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  try {
    await prisma.technologies.deleteMany({ where: { userId: id } });

    const result = await prisma.technologies.createMany({
      data,
      skipDuplicates: true,
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};
