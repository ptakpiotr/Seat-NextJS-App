/*
  Warnings:

  - The values [MODE1,MODE2] on the enum `ObjectMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ObjectMode_new" AS ENUM ('RECT', 'CIRCLE');
ALTER TABLE "Object" ALTER COLUMN "type" TYPE "ObjectMode_new" USING ("type"::text::"ObjectMode_new");
ALTER TYPE "ObjectMode" RENAME TO "ObjectMode_old";
ALTER TYPE "ObjectMode_new" RENAME TO "ObjectMode";
DROP TYPE "ObjectMode_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_authorId_fkey";
