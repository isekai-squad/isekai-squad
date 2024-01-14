import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ForumComment {
  id: string;
  userId: string | null;
  forum_PostsId: string | null;
  content: string;
  images: string[];
}
interface ForumCommentReplies {
  id: string;
  userId: string | null;
  post_commentsId: string | null;
  fPost_commentsId: string | null;
  content: string;
}

export async function getUserComments(
  req: Request,
  res: Response
): Promise<void> {
  const { userId } = req.params;
  try {
    const comments = await prisma.fPost_comments.findMany({
      where: { userId: userId },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            pdp: true,
          },
        },
      },
    });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function getAllComments(
  req: Request,
  res: Response
): Promise<void> {
  let {postId} = req.params
  try {
    const comments = await prisma.fPost_comments.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            pdp: true,
          },
        },
      },
      where: {forum_PostsId: postId}
    });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function addComment(req: Request, res: Response): Promise<void> {
  const { userId, postId } = req.params;
  const { content, images } = req.body;
  try {
    const newComment: ForumComment = await prisma.fPost_comments.create({
      data: {
        userId: userId,
        forum_PostsId: postId,
        content: content,
        images: images,
      },
    });
    res.status(200).send(newComment);
  } catch (err) {
    res.status(500).send(err);
  }
}
export async function updateComment(
  req: Request,
  res: Response
): Promise<void> {
  const { commentId, userId } = req.params;
  const { content, images } = req.body;
  try {
    await prisma.fPost_comments.update({
      where: { id: commentId, userId: userId },
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
  const { userId, commentId } = req.params;
  try {
    const findComment = await prisma.likes.findFirst({
      where: { userId: userId, fPost_commentsId: commentId },
    });

    if (!findComment) {
      await prisma.likes.create({
        data: {
          like: 1,
          fPost_commentsId: commentId,
          userId: userId,
        },
      });
    } else {
      await prisma.likes.deleteMany({
        where: { userId: userId, fPost_commentsId: commentId },
      });
    }
    res.status(200).send("incremented");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function deleteComment(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, commentId } = req.params;
  try {
    await prisma.fPost_comments.delete({
      where: { id: commentId, userId: userId },
    });
    res.status(200).send("deleted");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAllReplisOneComments(
  req: Request,
  res: Response
): Promise<void> {
  const { commentId } = req.params;
  try {
    const comments = await prisma.replies.findMany({
      where: { fPost_commentsId: commentId },
      include: {
        FPost_comments: true,
      },
    });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
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
      where: { id: commentId, userId: userId },
      data: {
        content: content,
      },
    });
    res.status(200).send("updated Comment");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function CommentLikeReplies(
  req: Request,
  res: Response
): Promise<void> {
  const { userId, commentId } = req.params;
  try {
    const findRepliComment = await prisma.likes.findFirst({
      where: { userId: userId, repliesId: commentId },
    });

    if (!findRepliComment) {
      await prisma.likes.create({
        data: {
          like: 1,
          repliesId: commentId,
          userId: userId,
        },
      });
    } else {
      await prisma.likes.deleteMany({
        where: { userId: userId, repliesId: commentId },
      });
    }

    res.status(200).send("incremented");
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAllLikes (req: Request , res: Response): Promise<void> {
  const {commentId} = req.params;
  try {
    const likes = await prisma.likes.findMany({
      where: { fPost_commentsId: commentId },
    });
    res.status(200).send(likes);
  }catch(err) {
    res.status(500).send(err);
  }
}
