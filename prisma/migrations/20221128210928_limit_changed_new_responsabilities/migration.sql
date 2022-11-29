/*
  Warnings:

  - You are about to drop the column `avaible_limit` on the `CardAccount` table. All the data in the column will be lost.
  - You are about to drop the column `selected_limit` on the `CardAccount` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Limit` table. All the data in the column will be lost.
  - You are about to drop the column `current_limit` on the `Limit` table. All the data in the column will be lost.
  - You are about to drop the column `previous_limit` on the `Limit` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Limit` table. All the data in the column will be lost.
  - You are about to drop the column `used_limit` on the `Limit` table. All the data in the column will be lost.
  - Added the required column `current` to the `Limit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_selected_limit` to the `Limit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_selected_limit` to the `Limit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Limit" DROP CONSTRAINT "Limit_cardId_fkey";

-- AlterTable
ALTER TABLE "CardAccount" DROP COLUMN "avaible_limit",
DROP COLUMN "selected_limit",
ADD COLUMN     "available_limit" INTEGER;

-- AlterTable
ALTER TABLE "Limit" DROP COLUMN "cardId",
DROP COLUMN "current_limit",
DROP COLUMN "previous_limit",
DROP COLUMN "status",
DROP COLUMN "used_limit",
ADD COLUMN     "current" BOOLEAN NOT NULL,
ADD COLUMN     "current_selected_limit" INTEGER NOT NULL,
ADD COLUMN     "previous_selected_limit" INTEGER NOT NULL;
