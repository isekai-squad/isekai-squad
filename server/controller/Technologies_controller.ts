import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const getAllTechno = async (req: Request, res: Response) => {
  const { specialtyId } = req.params;

  try {
    const result = await prisma.technologies.findMany({
      where: { specialtyId: specialtyId },
    });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

export const addNewTechnology = async (req: Request, res: Response) => {
  let { name, image, specialtyId } = req.body;
  try {
    const result = await prisma.technologies.create({
      data: {
        name,
        image,
        specialtyId: specialtyId,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

export const deleteTechnology = async (req: Request, res: Response) => {
  let { name } = req.body;
  try {
    const result = await prisma.technologies.deleteMany({
      where: {
        name,
      },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const addSpeciality = async (req: Request, res: Response) => {
  let { name } = req.body;
  try {
    const result = await prisma.specialty.create({
      data: {
        name,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const deleteSpeciality = async (req: Request, res: Response) => {
  let { name } = req.body;
  try {
    const result = await prisma.specialty.deleteMany({
      where: {
        name,
      },
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getUserTechno = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await prisma.userTechnology.findMany({
      where: { userId: userId },

      include: {
        Technologies: { select: { name: true, image: true } },
      },
    });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

export const addUserTechnology = async (req: Request, res: Response) => {
  const { data } = req.body;
  const { userId } = req.params;

  try {
    await prisma.userTechnology.deleteMany({ where: { userId: userId } });

    const result = await prisma.userTechnology.createMany({
      data: data,
      skipDuplicates: true,
    });
    res.status(200).send("updated");
  } catch (err) {
    console.log(err);

    res.status(400).send(err);
  }
};

export const getAllSpecialties = async (req: Request, res: Response) => {
  try {
    const result = await prisma.specialty.findMany();
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
    console.log(err);
  }
};

export const getSpecialityTech = async (req: Request, res: Response) => {

  const { specialtyId } = req.params;
  try {
    const result = await prisma.technologies.findMany({
      where: { specialtyId: specialtyId },
    });
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

export const addUserSpecialty = async (req: Request, res: Response) => {
   
  const { userId, specialtyId } = req.body;
  try {
    // Assuming you have a User model with a specialtyId field
    await prisma.user.update({
      where: { id: userId },
      data: {
        specialtyId: specialtyId,
      },
    });
    res.json("succes");
  } catch (error) {
    console.error("Error adding specialty to user:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const addProjectTechnology = async (req: Request, res: Response) => {
  let { data } = req.body;
  let { id } = req.params;
  try {
    await prisma.projectTechnology.deleteMany({
      where: { projectId: id },
    });
    const result = await prisma.projectTechnology.createMany({
      data,
      skipDuplicates: true,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
