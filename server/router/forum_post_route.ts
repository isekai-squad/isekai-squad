import express from "express";
import * as FormPostController from "../controller/forum_post_controller";
const forumPostRouter = express.Router();
forumPostRouter.get("/:postId", FormPostController.getOne);

forumPostRouter.get("/", FormPostController.getAll);

forumPostRouter.post("/:userId", FormPostController.addPost);

forumPostRouter.put("/:postId", FormPostController.updatePost);

forumPostRouter.get("/likes/:postId", FormPostController.getForumPostLikes);

forumPostRouter.delete("/:postId", FormPostController.deletePost);

forumPostRouter.post("/increment/:postId/:userId", FormPostController.incrementLike);

forumPostRouter.post("/decrement/:postId/:userId", FormPostController.decrementLike);


forumPostRouter.get("/likes/:postId/:userId", FormPostController.getForumPostUserLikes);



export default forumPostRouter;
