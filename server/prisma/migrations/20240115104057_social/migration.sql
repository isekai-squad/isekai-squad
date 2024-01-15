/*
  Warnings:

  - You are about to drop the column `socials` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "socials",
ADD COLUMN     "GitHub" TEXT,
ADD COLUMN     "Linkedin" TEXT;
