/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userID` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `user_ID` on the `sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_ID_fkey";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "user_ID",
ADD COLUMN     "user_ID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "userID",
ADD COLUMN     "userID" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("userID");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
