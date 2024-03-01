/*
  Warnings:

  - Made the column `title` on table `Notifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `message` on table `Notifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `read` on table `Notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Notifications_id_key";

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "message" SET NOT NULL,
ALTER COLUMN "read" SET NOT NULL;
