import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const addCommentProject = async (req: Request, res: Response) => {
  const { userId, content, images, projectId } = req.body;
  try {
    const result = await prisma.project_comments.create({
      data: {
        userId,
        content,
        images,
        projectId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const addCommentReplyProject = async (req: Request, res: Response) => {
  const { userId, content, image, project_commentsId } = req.body;
  try {
    const result = await prisma.replies.create({
      data: {
        userId,
        content,
        image,
        project_commentsId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const addCommentPost = async (req: Request, res: Response) => {
  let { postId, userId } = req.params;
  let { content, images } = req.body;
  try {
    const result = await prisma.post_comments.create({
      data: {
        postId: postId,
        userId: userId,
        content: content,
        images: images,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const addCommentReplyPost = async (req: Request, res: Response) => {
  const { userId, content, image, post_commentsId } = req.body;
  try {
    const result = await prisma.replies.create({
      data: {
        userId,
        content,
        image,
        post_commentsId,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const getAllCommentsProject = async (req: Request, res: Response) => {
  let { projectId } = req.params;
  try {
    const result = await prisma.project_comments.findMany({
      where: { projectId },
      include: {
        User: { select: { name: true, pdp: true } },
        likes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const getAllReplyCommentsProject = async (
  req: Request,
  res: Response
) => {
  let { project_commentsId } = req.params;
  try {
    const result = await prisma.replies.findMany({
      where: { project_commentsId: project_commentsId },
      include: {
        User: { select: { name: true, pdp: true } },
        likes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const getAllReplyCommentsPosts = async (req: Request, res: Response) => {
  let { post_commentsId } = req.params;

  try {
    const result = await prisma.replies.findMany({
      where: { post_commentsId: post_commentsId },
      include: {
        User: { select: { name: true, pdp: true } },
        likes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const getAllCommentsPost = async (req: Request, res: Response) => {
  let { postId } = req.params;
  try {
    const result = await prisma.post_comments.findMany({
      where: { postId },
      include: {
        User: { select: { name: true, pdp: true } },
        likes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const addLikeCommentProject = async (req: Request, res: Response) => {
  let { userId, projectCommentId } = req.params;
  try {
    let user = await prisma.likes.findFirst({
      where: { userId, project_commentsId: projectCommentId },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: { userId, project_commentsId: projectCommentId },
      });
      res.status(200).send("deleted");
    } else {
      const result = await prisma.likes.create({
        data: {
          userId: userId,
          project_commentsId: projectCommentId,
          like: 1,
        },
      });
      console.log(result);
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const addLikeReplyCommentProject = async (
  req: Request,
  res: Response
) => {
  let { userId, projectReplyCommentId } = req.params;
  try {
    let user = await prisma.likes.findFirst({
      where: { userId, repliesId: projectReplyCommentId },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: { userId, repliesId: projectReplyCommentId },
      });
      res.status(200).send("deleted");
    } else {
      const result = await prisma.likes.create({
        data: {
          userId: userId,
          repliesId: projectReplyCommentId,
          like: 1,
        },
      });
      console.log(result);
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const addLikeReplyCommentPost = async (req: Request, res: Response) => {
  let { userId, postReplyCommentId } = req.params;
  try {
    let user = await prisma.likes.findFirst({
      where: { userId, repliesId: postReplyCommentId },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: { userId, repliesId: postReplyCommentId },
      });
      res.status(200).send("deleted");
    } else {
      const result = await prisma.likes.create({
        data: {
          userId: userId,
          repliesId: postReplyCommentId,
          like: 1,
        },
      });
      console.log(result);
      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const addLikeCommentPost = async (req: Request, res: Response) => {
  let { userId, post_commentsId } = req.params;
  try {
    let user = await prisma.likes.findFirst({
      where: { userId, post_commentsId: post_commentsId },
    });
    if (user) {
      await prisma.likes.deleteMany({
        where: { userId, post_commentsId: post_commentsId },
      });
      res.status(200).send("deleted");
    } else {
      const result = await prisma.likes.create({
        data: {
          userId: userId,
          like: 1,
          post_commentsId: post_commentsId,
        },
      });

      res.status(201).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const getAllLikesCommentProject = async (
  req: Request,
  res: Response
) => {
  let { project_commentsId } = req.params;
  try {
    const result = await prisma.likes.findMany({
      where: { project_commentsId },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const getAllLikesCommentPost = async (req: Request, res: Response) => {
  let { post_commentsId } = req.params;
  try {
    const result = await prisma.likes.findMany({
      where: { post_commentsId },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const deleteCommentProject = async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const result = await prisma.project_comments.deleteMany({
      where: { id },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const deleteCommentPost = async (req: Request, res: Response) => {
  let { id } = req.params;
  try {
    const result = await prisma.post_comments.deleteMany({
      where: { id },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const updateCommentProject = async (req: Request, res: Response) => {
  let { id, userId } = req.params;
  try {
    const result = await prisma.project_comments.update({
      where: { id, userId },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const updateCommentPost = async (req: Request, res: Response) => {
  let { id, userId } = req.params;
  try {
    const result = await prisma.post_comments.update({
      where: { id, userId },
      data: req.body,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
