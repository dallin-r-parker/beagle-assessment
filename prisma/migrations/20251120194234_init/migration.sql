-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "account" TEXT NOT NULL,
    "accountDescription" TEXT NOT NULL,
    "enteredDate" TEXT NOT NULL,
    "effectiveDate" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "debit" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
