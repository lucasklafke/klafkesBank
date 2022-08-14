-- CreateTable
CREATE TABLE "associate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthdate" DATE NOT NULL,
    "createdAt" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "vigencyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vigencyEndDate" TIMESTAMP(3),
    "password" TEXT NOT NULL,

    CONSTRAINT "associate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "logo" TEXT NOT NULL,
    "account_number" TEXT,
    "end_date" TIMESTAMP(3),
    "current_status" TEXT NOT NULL,
    "describe" TEXT NOT NULL,
    "push_describe" TEXT NOT NULL,

    CONSTRAINT "CardRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardProcess" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "card_request" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_status" TEXT NOT NULL,

    CONSTRAINT "CardProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "logo" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "block_code" TEXT NOT NULL,
    "blockDate" TIMESTAMP(3),
    "isMainCard" BOOLEAN,
    "type" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Limit" (
    "id" SERIAL NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,
    "change_type" TEXT NOT NULL,
    "change_level" TEXT NOT NULL,
    "card_account_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "current_limit" INTEGER NOT NULL,
    "previous_limit" INTEGER NOT NULL,
    "previous_id" INTEGER NOT NULL,
    "vingency_date" DATE NOT NULL,

    CONSTRAINT "Limit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "account_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "associateId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "account_type" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardAccount" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "approved_limit" INTEGER NOT NULL,
    "selected_limit" INTEGER NOT NULL,
    "avaible_limit" INTEGER,
    "dueday" TIMESTAMP(3) NOT NULL,
    "invoice_value" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "block_code" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "default_code" TEXT NOT NULL,
    "associateId" INTEGER,

    CONSTRAINT "CardAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_number_key" ON "Card"("number");

-- AddForeignKey
ALTER TABLE "CardProcess" ADD CONSTRAINT "CardProcess_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardProcess" ADD CONSTRAINT "CardProcess_card_request_fkey" FOREIGN KEY ("card_request") REFERENCES "CardRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limit" ADD CONSTRAINT "Limit_card_account_id_fkey" FOREIGN KEY ("card_account_id") REFERENCES "CardAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limit" ADD CONSTRAINT "Limit_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardAccount" ADD CONSTRAINT "CardAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardAccount" ADD CONSTRAINT "CardAccount_associateId_fkey" FOREIGN KEY ("associateId") REFERENCES "associate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
