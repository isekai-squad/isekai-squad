/*
  Warnings:

  - You are about to drop the column `fPost_commentsId` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `post_commentsId` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `project_commentsId` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `repliesId` on the `Notifications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_fPost_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_post_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_project_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_repliesId_fkey";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "fPost_commentsId",
DROP COLUMN "post_commentsId",
DROP COLUMN "project_commentsId",
DROP COLUMN "repliesId";
