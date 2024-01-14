/*
  Warnings:

  - You are about to drop the column `userId` on the `Specialty` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Technologies` table. All the data in the column will be lost.
  - You are about to drop the column `technologyId` on the `userTechnology` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Specialty" DROP CONSTRAINT "Specialty_userId_fkey";

-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_userId_fkey";

-- DropForeignKey
ALTER TABLE "userTechnology" DROP CONSTRAINT "userTechnology_technologyId_fkey";

-- AlterTable
ALTER TABLE "Specialty" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "userId",
ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "userTechnologyId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "specialtyId" TEXT;

-- AlterTable
ALTER TABLE "userTechnology" DROP COLUMN "technologyId";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_userTechnologyId_fkey" FOREIGN KEY ("userTechnologyId") REFERENCES "userTechnology"("id") ON DELETE SET NULL ON UPDATE CASCADE;
