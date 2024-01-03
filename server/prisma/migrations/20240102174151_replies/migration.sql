-- AlterTable
ALTER TABLE "Replies" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
