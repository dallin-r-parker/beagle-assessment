/*
  Warnings:

  - Changed the type of `enteredDate` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `effectiveDate` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "enteredDate",
ADD COLUMN     "enteredDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "effectiveDate",
ADD COLUMN     "effectiveDate" TIMESTAMP(3) NOT NULL;
