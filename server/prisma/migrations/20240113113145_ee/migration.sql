/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_paymentId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "serviceId" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "paymentId";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
