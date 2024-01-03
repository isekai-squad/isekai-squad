import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ForumPost {
  id: string;
  userId: string | null;
  title: string;
  content: String;
  images: string[];
}

export async function getOne(req: Request, res: Response): Promise<void> {
  const { postId } = req.params;
  try {
    const posts = await prisma.forum_Posts.findUnique({
      where: { id: postId },
      include: {
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    posts
      ? res.status(200).send(posts)
      : res.status(230).send("posts not found");
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const posts = await prisma.forum_Posts.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function addPost(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;

  const { title, content, images } = req.body;
  try {
    const newPost: ForumPost = await prisma.forum_Posts.create({
      data: {
        userId: userId,
        title: title,
        content: content,
        images: images,
      },
    });
    res.status(200).send(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function updatePost(req: Request, res: Response): Promise<void> {
  const { postId } = req.params;

  const { title, content, images } = req.body;
  try {
    await prisma.forum_Posts.update({
      where: { id: postId },
      data: {
        content: content,
        images: images,
        title: title,
      },
    });
    res.status(200).send("updated Comment");
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function deletePost(req: Request, res: Response): Promise<void> {
  const { postId } = req.params;
  try {
    await prisma.forum_Posts.delete({ where: { id: postId } });
    res.status(200).send("deleted");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getForumPostUserLikes(
  req: Request,
  res: Response
): Promise<void> {
  const { postId, userId } = req.params;
  try {
    const posts = await prisma.likes.count({
      where: { postId: postId, userId: userId },
    });
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function getForumPostLikes(
  req: Request,
  res: Response
): Promise<void> {
  const { postId } = req.params;
  try {
    const posts = await prisma.likes.count({
      where: { postId: postId, like: 1 },
    });
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function incrementLike(
  req: Request,
  res: Response
): Promise<void> {
  const { postId, userId } = req.params;
  try {
    const findUser = await prisma.likes.findFirst({
      where: { userId: userId, postId: postId },
    });

    if (!findUser) {
      await prisma.likes.create({
        data: {
          like: 1,
          postId: postId,
          userId: userId,
        },
      });
    } else {
      await prisma.likes.deleteMany({
        where: { userId: userId, postId: postId },
      });
    }

    res.status(200).send("incremented");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export async function decrementLike(
  req: Request,
  res: Response
): Promise<void> {
  const { postId, userId } = req.params;
  try {
    const findUser = await prisma.likes.findFirst({
      where: { userId: userId, postId: postId },
    });

    if (!findUser) {
      await prisma.likes.create({
        data: {
          like: 0,
          postId: postId,
          userId: userId,
        },
      });
    } else {
      await prisma.likes.deleteMany({
        where: { userId: userId, postId: postId },
      });
    }

    res.status(200).send("decremented");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
