/*
  Warnings:

  - You are about to drop the column `card_id` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `card_account_id` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "card_id",
ADD COLUMN     "card_account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "associate" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
