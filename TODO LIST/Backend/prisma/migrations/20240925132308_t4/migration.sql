/*
  Warnings:

  - Made the column `user_ID` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_ID_fkey";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "user_ID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
