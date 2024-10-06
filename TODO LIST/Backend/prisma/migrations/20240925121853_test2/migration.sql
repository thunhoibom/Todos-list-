/*
  Warnings:

  - You are about to drop the column `user_ID` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_ID_fkey";

-- DropIndex
DROP INDEX "Session_user_ID_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "user_ID";
