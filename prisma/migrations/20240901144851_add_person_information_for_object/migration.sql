/*
  Warnings:

  - You are about to drop the `_People` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_People" DROP CONSTRAINT "_People_A_fkey";

-- DropForeignKey
ALTER TABLE "_People" DROP CONSTRAINT "_People_B_fkey";

-- AlterTable
ALTER TABLE "Object" ADD COLUMN     "authorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_People";

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
