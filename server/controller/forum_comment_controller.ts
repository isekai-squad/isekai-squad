import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ForumComment {
  id: string;
  userId: string | null;
  forum_PostsId: string | null;
  content: string;
  images: string[];
  likes: number;
}
interface ForumCommentReplies {
  id: string;
  userId: string | null;
  post_commentsId: string | null;
  fPost_commentsId: string | null;
  content: string;
}

export async function getAllComments(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const comments = await prisma.fPost_comments.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    response.status(200).send(comments);
  } catch (error) {
    response.status(500).send(error);
  }
}
export async function addComment(req: Request, res: Response): Promise<void> {
  const { userId, postId } = req.params;
  const { content, images } = req.body;
  // try {
  //   const newComment: ForumComment = await prisma.fPost_comments.create({
  //     data: {
  //       userId: userId,
  //       forum_PostsId: postId,
  //       content: content,
  //       images: images,
  //     },
  //   });
  //   res.status(200).send(newComment);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}
export async function updateComment(
  req: Request,
  res: Response
): Promise<void> {
  const { commentId, userId, postId } = req.params;
  const { content, images } = req.body;
  try {
    await prisma.fPost_comments.update({
      where: { id: commentId, userId: userId, forum_PostsId: postId },
      data: {
        content: content,
        images: images,
      },
    });
    res.status(200).send("updated Comment");
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function incrementCommentLike(
  req: Request,
  res: Response
): Promise<void> {
  const { commentId } = req.params;
  // try {
  //   await prisma.fPost_comments.update({
  //     where: { id: commentId },
  //     data: {
  //       likes: { increment: 1 },
  //     },
  //   });
  //   res.status(200).send("incremented");
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}
export async function decrementCommentLike(
  req: Request,
  res: Response
): Promise<void> {
  const { commentId } = req.params;
  // try {
  //   await prisma.fPost_comments.update({
  //     where: { id: commentId },
  //     data: {
  //       likes: { increment: 1 },
  //     },
  //   });
  //   res.status(200).send("incremented");
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}

export async function deleteComment(
  req: Request,
  res: Response
): Promise<void> {
  const { userId } = req.params;
  try {
    await prisma.fPost_comments.delete({ where: { id: userId } });
    res.status(200).send("deleted");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAllReplisOneComments(
  request: Request,
  response: Response
): Promise<void> {
  const { commentId } = request.params;
  try {
    const comments = await prisma.replies.findMany({
      where: { fPost_commentsId: commentId },
    });
    response.status(200).send(comments);
  } catch (error) {
    response.status(500).send(error);
  }
}
export async function addRepliesComment(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, commentId } = req.params;
  const { content } = req.body;
  try {
    const newComment: ForumCommentReplies = await prisma.replies.create({
      data: {
        userId: userId,
        fPost_commentsId: commentId,
        content: content,
      },
    });
    res.status(200).send(newComment);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function repliesUpdate(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, commentId } = req.params;
  const { content } = req.body;
  try {
    await prisma.replies.update({
      where: { id: userId, fPost_commentsId: commentId },
      data: {
        content: content,
      },
    });
    res.status(200).send("updated Comment");
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function incrementCommentLikeReplies(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, repliCommentId, commentId } = req.params;
  // try {
  //   await prisma.replies.update({
  //     where: {
  //       id: repliCommentId,
  //       userId: userId,
  //       fPost_commentsId: commentId,
  //     },
  //     data: {
  //       likes: { increment: 1 },
  //     },
  //   });
  //   res.status(200).send("incremented");
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}
export async function decrementCommentLikeReplies(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, repliCommentId, commentId } = req.params;
  // try {
  //   await prisma.replies.update({
  //     where: {
  //       id: repliCommentId,
  //       userId: userId,
  //       fPost_commentsId: commentId,
  //     },
  //     data: {
  //       likes: { decrement: 1 },
  //     },
  //   });
  //   res.status(200).send("incremented");
  // } catch (err) {
  //   res.status(500).send(err);
  // }
}
