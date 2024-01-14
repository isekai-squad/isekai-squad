/*
  Warnings:

  - You are about to drop the column `userTechnologyId` on the `Technologies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_userTechnologyId_fkey";

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "userTechnologyId";

-- AlterTable
ALTER TABLE "userTechnology" ADD COLUMN     "technologiesId" TEXT;

-- AddForeignKey
ALTER TABLE "userTechnology" ADD CONSTRAINT "userTechnology_technologiesId_fkey" FOREIGN KEY ("technologiesId") REFERENCES "Technologies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
