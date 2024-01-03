import * as PostController from "../controller/Posts_controller"

const route = require("express").Router()

route.get("/Projects" , PostController.getAllProject)
route.get("/Projects/:userId", PostController.getAllProjectOneUser)
route.get("/Posts" , PostController.getAllPosts)
route.get("/Posts/:userId", PostController.getAllPostsOneUser)
route.post("/Projects/:userId", PostController.addProject)
route.post("/Posts/:userId" , PostController.addPost)
route.delete("/Projects/:userId/:projectId", PostController.deleteProject)
route.delete("/Posts/:userId/:postId", PostController.deletePost)
route.put("/Projects/:userId/:projectId", PostController.updateProject)
route.put("/Posts/:userId/:postId" , PostController.updatePost)


export default route;