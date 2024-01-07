import * as PostsComments from "../controller/PostsComment_controller"

const route = require("express").Router;

route.post('/Projects/:projectId/:userId' , PostsComments.addCommentProject);
route.post('/Posts/:projectId/:userId' , PostsComments.addCommentPost);
route.get('/projects/:projectId', PostsComments.getAllCommentsProject);
route.get('/Posts/:projectId', PostsComments.getAllCommentsPost);
route.delete('/Projects/:id' , PostsComments.deleteCommentProject);
route.delete('/Posts/:id' , PostsComments.deleteCommentPost);
route.put('/Projects/:id/:userId', PostsComments.updateCommentProject);
route.put('/Posts/:id/:userId', PostsComments.updateCommentPost);
route.post('/Projects/Like/:userId/:projectCommentId', PostsComments.addLikeCommentProject)
route.post('/Posts/Like/:userId/:postCommentId', PostsComments.addLikeCommentPost)
route.get('/Projects/Like/:project_commentsId' , PostsComments.getAllLikesCommentProject)
route.get('/Posts/Like/:post_commentsId' , PostsComments.getAllLikesCommentPost)

export default route;