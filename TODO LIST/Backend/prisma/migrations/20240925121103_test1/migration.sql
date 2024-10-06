/*
  Warnings:

  - A unique constraint covering the columns `[user_ID]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_ID` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "user_ID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_ID_key" ON "Session"("user_ID");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
