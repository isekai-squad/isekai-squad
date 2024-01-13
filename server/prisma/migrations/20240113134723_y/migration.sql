/*
  Warnings:

  - You are about to drop the `Basket_Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Basket_Payment" DROP CONSTRAINT "Basket_Payment_basketId_fkey";

-- DropForeignKey
ALTER TABLE "Basket_Payment" DROP CONSTRAINT "Basket_Payment_paymentId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "basketId" TEXT;

-- DropTable
DROP TABLE "Basket_Payment";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
