-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "fPost_commentsId" TEXT,
ADD COLUMN     "forum_PostsId" TEXT,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "post_commentsId" TEXT,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "project_commentsId" TEXT,
ADD COLUMN     "repliesId" TEXT,
ADD COLUMN     "serviceId" TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_project_commentsId_fkey" FOREIGN KEY ("project_commentsId") REFERENCES "Project_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_post_commentsId_fkey" FOREIGN KEY ("post_commentsId") REFERENCES "Post_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_repliesId_fkey" FOREIGN KEY ("repliesId") REFERENCES "Replies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_forum_PostsId_fkey" FOREIGN KEY ("forum_PostsId") REFERENCES "Forum_Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_fPost_commentsId_fkey" FOREIGN KEY ("fPost_commentsId") REFERENCES "FPost_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
