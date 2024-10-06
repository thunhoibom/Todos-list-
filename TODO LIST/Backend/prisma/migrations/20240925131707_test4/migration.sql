-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_ID_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "user_ID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;
