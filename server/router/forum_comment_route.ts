import express from "express";
import * as FormCommentController from "../controller/forum_comment_controller";
const forumCommentRouter = express.Router();

forumCommentRouter.get("/:postId", FormCommentController.getAllComments);

forumCommentRouter.post(
  "/:userId/:postId/comments",
  FormCommentController.addComment
);

forumCommentRouter.put(
  "/:userId/:commentId/comments",
  FormCommentController.updateComment
);

forumCommentRouter.delete(
  "/:userId/:commentId/comments",
  FormCommentController.deleteComment
);

forumCommentRouter.put(
  "/:commentId/:userId/comments/increment",
  FormCommentController.incrementCommentLike
);

forumCommentRouter.get(
  "/:commentId/comments/replies",
  FormCommentController.getAllReplisOneComments
);

forumCommentRouter.post(
  "/:userId/:commentId/comments/replies",
  FormCommentController.addRepliesComment
);

forumCommentRouter.put(
  "/:userId/:commentId/comments/replies",
  FormCommentController.repliesUpdate
);

forumCommentRouter.put(
  "/:commentId/:userId/comments/replies/increment",
  FormCommentController.CommentLikeReplies
);

forumCommentRouter.put(
  "/:commentId/:userId/comments/replies/decrement",
  FormCommentController.CommentLikeReplies
);

export default forumCommentRouter;
