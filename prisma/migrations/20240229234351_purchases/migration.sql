/*
  Warnings:

  - Made the column `details` on table `Purchases` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Purchases_id_key";

-- AlterTable
ALTER TABLE "Purchases" ALTER COLUMN "total" DROP DEFAULT,
ALTER COLUMN "jobCost" DROP DEFAULT,
ALTER COLUMN "cupidPayout" DROP DEFAULT,
ALTER COLUMN "profit" DROP DEFAULT,
ALTER COLUMN "details" SET NOT NULL,
ALTER COLUMN "details" SET DEFAULT 'Cupid Code Intervention';
