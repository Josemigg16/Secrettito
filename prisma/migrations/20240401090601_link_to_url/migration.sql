/*
  Warnings:

  - You are about to drop the column `link` on the `Post` table. All the data in the column will be lost.
  - Added the required column `url` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "link",
ADD COLUMN     "url" TEXT NOT NULL;
