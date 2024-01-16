import * as PostController from "../controller/Posts_controller"

const route = require("express").Router()

route.get("/Projects" , PostController.getAllProject)
route.get("/Projects/:userId", PostController.getAllProjectOneUser)
route.get("/Projects/likes/mostLikedProject", PostController.getMostLikedProject)
route.get("/Posts" , PostController.getAllPosts)
route.get("/Post/:userId", PostController.getAllPostsOneUser)
route.post("/Projects/:userId", PostController.addProject)
route.post("/Posts/:userId" , PostController.addPost)
route.delete("/Projects/:userId/:projectId", PostController.deleteProject)
route.delete("/Posts/:userId/:postId", PostController.deletePost)
route.put("/Projects/:userId/:projectId", PostController.updateProject)
route.put("/Posts/:userId/:postId" , PostController.updatePost)
route.post("/Projects/UpVote/:userId/:projectId", PostController.upVoteProject)
route.post("/Projects/DownVote/:userId/:projectId" , PostController.downVoteProject)
route.post("/Posts/UpVote/:userId/:postId" , PostController.upVotePost)
route.post("/Posts/DownVote/:userId/:postId" , PostController.downVotePost)
route.get("/Projects/Likes/:projectId", PostController.getAlllLikesProject)
route.get("/:userId/Likes", PostController.getUserLikes)
route.get("/Posts/Likes/:postId", PostController.getAllLikesPosts)

export default route;