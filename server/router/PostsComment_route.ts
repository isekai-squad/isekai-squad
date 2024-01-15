import * as PostsComments from "../controller/PostsComment_controller"

const route = require("express").Router();

route.post('/Projects/:projectId/:userId' , PostsComments.addCommentProject);
route.post('/Projects/reply/:projectId/:userId/comment' , PostsComments.addCommentReplyProject);
route.post('/Posts/:postId/:userId' , PostsComments.addCommentPost);
route.post('/Posts/reply/:post_commentsId/:userId/comment' , PostsComments.addCommentReplyPost);
route.get('/projects/:projectId', PostsComments.getAllCommentsProject);
route.get('/projects/:project_commentsId/replyComment', PostsComments.getAllReplyCommentsProject);
route.get('/Posts/:post_commentsId/replyComment', PostsComments.getAllReplyCommentsPosts);
route.get('/Posts/:postId', PostsComments.getAllCommentsPost);
route.delete('/Projects/:id' , PostsComments.deleteCommentProject);
route.delete('/Posts/delete/comment/:id' , PostsComments.deleteCommentPost);
route.put('/Projects/:id/:userId', PostsComments.updateCommentProject);
route.put('/Posts/:id/:userId', PostsComments.updateCommentPost);
route.post('/Projects/Like/:userId/:projectCommentId', PostsComments.addLikeCommentProject)
route.post('/Projects/Like/:userId/Reply/:projectReplyCommentId', PostsComments.addLikeReplyCommentProject)
route.post('/Posts/Like/:userId/Reply/:postReplyCommentId', PostsComments.addLikeReplyCommentPost)
route.post('/Posts/Like/:userId/:post_commentsId', PostsComments.addLikeCommentPost)
route.get('/Projects/Like/:project_commentsId' , PostsComments.getAllLikesCommentProject)
route.get('/Posts/Like/:post_commentsId' , PostsComments.getAllLikesCommentPost)

export default route;