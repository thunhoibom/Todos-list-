/*
  Warnings:

  - A unique constraint covering the columns `[user_ID]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_ID]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_ID` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "user_ID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_user_ID_key" ON "Todo"("user_ID");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_ID_key" ON "sessions"("user_ID");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
