/*
  Warnings:

  - Added the required column `data` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "data",
ADD COLUMN     "data" BYTEA NOT NULL;
