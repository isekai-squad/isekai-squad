import express from "express";
import * as FormCommentController from "../controller/forum_comment_controller";
const forumCommentRouter = express.Router();

forumCommentRouter.get("/:postId", FormCommentController.getAllComments);

forumCommentRouter.post(
  "/:userId/:postId/comments",
  FormCommentController.addComment
);

forumCommentRouter.put(
  "/:userId/:postId/:commentId/comments",
  FormCommentController.updateComment
);

forumCommentRouter.delete(
  "/:userId/:postId/:commentId/comments",
  FormCommentController.deleteComment
);

forumCommentRouter.put(
  "/:commentId/comments/increment",
  FormCommentController.incrementCommentLike
);

forumCommentRouter.put(
  "/:commentId/comments/decrement",
  FormCommentController.decrementCommentLike
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
  "/:userId/:commentId/:repliCommentId/comments/replies/increment",
  FormCommentController.incrementCommentLikeReplies
);

forumCommentRouter.put(
  "/:userId/:commentId/comments/:repliCommentId/replies/decrement",
  FormCommentController.decrementCommentLikeReplies
);

export default forumCommentRouter;
