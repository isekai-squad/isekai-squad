/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_serviceId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "paymentId" TEXT;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
