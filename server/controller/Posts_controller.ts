import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const addProject = async (req: Request, res: Response) => {
  let { userId } = req.params;
  let { title, description, content, images } = req.body;
  try {
    const result = await prisma.project.create({
      data: {
        title,
        description,
        content,
        images,
        userId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const upVoteProject = async (req: Request, res: Response) => {
  let { projectId, userId } = req.params;
  try {
    const user = await prisma.likes.findFirst({
      where: {
        userId,
        projectId,
      },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: {
          userId,
          projectId,
        },
      });
      res.status(200).send({
        message: "deleted",
      });
    } else {
      const result = await prisma.likes.create({
        data: {
          like: 1,
          projectId,
          userId,
        },
      });
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const downVoteProject = async (req: Request, res: Response) => {
  let { projectId, userId } = req.params;
  try {
    const user = await prisma.likes.findFirst({
      where: {
        userId,
        projectId,
      },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: {
          userId,
          projectId,
        },
      });
      res.status(200).send({
        message: "deleted",
      });
    } else {
      const result = await prisma.likes.create({
        data: {
          like: 0,
          projectId,
          userId,
        },
      });
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const addPost = async (req: Request, res: Response) => {
  let { userId } = req.params;
  let { title, content, images } = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        images,
        userId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const getAllProject = async (req: Request, res: Response) => {
  try {
    const result = await prisma.project.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const getLimitProjects = async (req: Request, res: Response) => {
  const { limit } = req.query;
  const { specialtyId } = req.params;

  try {
    const result = await prisma.user.findMany({
      where: {
        specialtyId: specialtyId,
      },

      include: {
        project: {
          orderBy: { created_at: "desc" },
          take: Number(1),
        },
      },
      take: Number(3),
    });

    const filteredResult = result.filter((user) => {
      return user.project.length > 0;
    });

    res.status(200).json(filteredResult);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getAllProjectOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const parsedLimit = Number(limit);
    const parsedPage = Number(page);

    if (
      isNaN(parsedLimit) ||
      parsedLimit <= 0 ||
      isNaN(parsedPage) ||
      parsedPage <= 0
    ) {
      return res.status(400).json({ error: "Invalid limit or page parameter" });
    }

    const result = await prisma.project.findMany({
      where: { userId },
      include: {
        likes: true,
        comment: {
          include: {
            likes: true,
            replies: { include: { likes: true } },
          },
        },
        projectTechnology: true,
      },
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.project.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const getLimitPosts = async (req: Request, res: Response) => {
  const { limit } = req.query;
  const { specialtyId } = req.params;

  try {
    const result = await prisma.user.findMany({
      where: {
        specialtyId: specialtyId,
      },
      include: {
        posts: {
          orderBy: { created_at: "desc" },
          take: Number(1),
        },
      },
      take: Number(3),
    });

    const filteredResult = result.filter((user) => {
      return user.posts.length > 0;
    });
    res.status(200).json(filteredResult);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getAllPostsOneUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const parsedLimit = Number(limit);
    const parsedPage = Number(page);

    if (
      isNaN(parsedLimit) ||
      parsedLimit <= 0 ||
      isNaN(parsedPage) ||
      parsedPage <= 0
    ) {
      return res.status(400).json({ error: "Invalid limit or page parameter" });
    }

    const result = await prisma.post.findMany({
      where: { userId },
      include: {
        likes: true,
        comments: {
          include: {
            likes: true,
            replies: { include: { likes: true } },
          },
        },
      },
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit,
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const upVotePost = async (req: Request, res: Response) => {
  let { postId, userId } = req.params;
  try {
    const user = await prisma.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      res.status(200).send({
        message: "deleted",
      });
    } else {
      const result = await prisma.likes.create({
        data: {
          like: 1,
          postId,
          userId,
        },
      });

      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const downVotePost = async (req: Request, res: Response) => {
  let { postId, userId } = req.params;
  try {
    const user = await prisma.likes.findFirst({
      where: {
        userId,
        postId,
      },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      res.status(200).send({
        message: "deleted",
      });
    } else {
      const result = await prisma.likes.create({
        data: {
          like: 0,
          postId,
          userId,
        },
      });
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  let { userId, projectId } = req.params;
  try {
    const result = await prisma.project.delete({
      where: { id: projectId, userId },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  let { userId, projectId } = req.params;
  try {
    const result = await prisma.project.update({
      where: { id: projectId, userId },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  let { userId, postId } = req.params;
  try {
    const result = await prisma.post.delete({
      where: { id: postId, userId },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  let { userId, postId } = req.params;
  try {
    const result = await prisma.post.update({
      where: { id: postId, userId },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getAllLikesPosts = async (req: Request, res: Response) => {
  let { postId } = req.params;
  try {
    const likes = await prisma.likes.findMany({
      where: { postId },
    });
    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getAlllLikesProject = async (req: Request, res: Response) => {
  let { projectId } = req.params;
  try {
    const likes = await prisma.likes.findMany({
      where: { projectId },
    });
    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const getUserLikes = async (req: Request, res: Response) => {
  let { userId } = req.params;
  try {
    const likes = await prisma.likes.findMany({
      where: { userId: userId },
    });
    res.status(200).json(likes);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
export const getMostLikedProject = async (req: Request, res: Response) => {
  try {
    const mostLiked = await prisma.likes.groupBy({
      by: ["projectId"],

      orderBy: {
        _count: {
          projectId: "desc",
        },
      },
      take: 1,
    });

    if (mostLiked.length === 0) {
      return res.status(404).json({ message: "No likes found" });
    }

    const projectId = String(mostLiked[0].projectId);
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { User: true },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
