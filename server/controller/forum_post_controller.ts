import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ForumPost {
  id: string;
  userId: string | null;
  title: string;
  content: String;
  images: string[];
  likes: number;
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
  // try {
  //   const newPost: ForumPost = await prisma.forum_Posts.create({
  //     data: {
  //       userId: userId,
  //       title: title,
  //       content: content,
  //       images: images,
  //     },
  //   });
  //   res.status(200).send(newPost);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
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
export async function incrementLike(
  req: Request,
  res: Response
): Promise<void> {
  const { postId } = req.params;
  // try {
  //   await prisma.forum_Posts.update({
  //     where: { id: postId },
  //     data: {
  //       likes: { increment: 1 },
  //     },
  //   });
  //   res.status(200).send("incremented");
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}
export async function decrementLike(
  req: Request,
  res: Response
): Promise<void> {
  const { postId } = req.params;
  // try {
  //   await prisma.forum_Posts.update({
  //     where: { id: postId },
  //     data: {
  //       likes: { decrement: 1 },
  //     },
  //   });
  //   res.status(200).send("incremented");
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}
