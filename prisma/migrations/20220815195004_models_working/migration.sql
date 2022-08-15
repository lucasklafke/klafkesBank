/*
  Warnings:

  - You are about to drop the column `limit` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `card_id` on the `Limit` table. All the data in the column will be lost.
  - You are about to drop the column `change_level` on the `Limit` table. All the data in the column will be lost.
  - You are about to drop the column `change_type` on the `Limit` table. All the data in the column will be lost.
  - Added the required column `card_account_id` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Made the column `invoice_value` on table `CardAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `associateId` on table `CardAccount` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `Limit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `used_limit` to the `Limit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CardAccount" DROP CONSTRAINT "CardAccount_associateId_fkey";

-- DropForeignKey
ALTER TABLE "Limit" DROP CONSTRAINT "Limit_card_id_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "limit",
ADD COLUMN     "card_account_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CardAccount" ALTER COLUMN "invoice_value" SET NOT NULL,
ALTER COLUMN "associateId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Limit" DROP COLUMN "card_id",
DROP COLUMN "change_level",
DROP COLUMN "change_type",
ADD COLUMN     "cardId" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "used_limit" INTEGER NOT NULL,
ALTER COLUMN "change_date" DROP NOT NULL,
ALTER COLUMN "change_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "previous_id" DROP NOT NULL,
ALTER COLUMN "vingency_date" DROP NOT NULL,
ALTER COLUMN "vingency_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "vingency_date" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Limit" ADD CONSTRAINT "Limit_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardAccount" ADD CONSTRAINT "CardAccount_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
