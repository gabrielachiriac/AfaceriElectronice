/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `orderId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "orderId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
