/*
  Warnings:

  - The `images` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pdp" SET DEFAULT 'https://cdn-icons-png.flaticon.com/512/219/219983.png';
