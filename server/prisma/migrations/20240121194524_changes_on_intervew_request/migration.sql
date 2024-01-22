/*
  Warnings:

  - You are about to drop the column `companyId` on the `InterviewRequest` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `InterviewRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InterviewRequest" DROP CONSTRAINT "InterviewRequest_companyId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewRequest" DROP CONSTRAINT "InterviewRequest_studentId_fkey";

-- AlterTable
ALTER TABLE "InterviewRequest" DROP COLUMN "companyId",
DROP COLUMN "studentId",
ADD COLUMN     "receiver" TEXT,
ADD COLUMN     "sender" TEXT;

-- CreateTable
CREATE TABLE "Calls" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Calls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewRequest" ADD CONSTRAINT "InterviewRequest_sender_fkey" FOREIGN KEY ("sender") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewRequest" ADD CONSTRAINT "InterviewRequest_receiver_fkey" FOREIGN KEY ("receiver") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calls" ADD CONSTRAINT "Calls_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calls" ADD CONSTRAINT "Calls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
