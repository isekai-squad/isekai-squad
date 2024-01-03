import express from "express";
import * as FormPostController from "../controller/forum_post_controller";
const forumPostRouter = express.Router();

forumPostRouter.get("/:postId", FormPostController.getOne);

forumPostRouter.get("/", FormPostController.getAll);

forumPostRouter.post("/:userId", FormPostController.addPost);

forumPostRouter.put("/:postId", FormPostController.updatePost);

forumPostRouter.delete("/:postId", FormPostController.deletePost);

forumPostRouter.put("/increment/:postId", FormPostController.incrementLike);

forumPostRouter.put("/decrement/:postId", FormPostController.decrementLike);


export default forumPostRouter;
