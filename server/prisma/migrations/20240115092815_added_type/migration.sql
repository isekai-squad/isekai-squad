/*
  Warnings:

  - You are about to drop the column `forum_PostsId` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Notifications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_forum_PostsId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_postId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_serviceId_fkey";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "forum_PostsId",
DROP COLUMN "projectId",
DROP COLUMN "serviceId",
ADD COLUMN     "type" TEXT;
