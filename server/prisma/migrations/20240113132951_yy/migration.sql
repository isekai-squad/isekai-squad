/*
  Warnings:

  - You are about to drop the column `basketId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_basketId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "basketId";

-- CreateTable
CREATE TABLE "Basket_Payment" (
    "id" TEXT NOT NULL,
    "basketId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "Basket_Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Basket_Payment" ADD CONSTRAINT "Basket_Payment_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket_Payment" ADD CONSTRAINT "Basket_Payment_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
