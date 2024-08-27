/*
  Warnings:

  - Added the required column `info` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "info" TEXT NOT NULL;
