/*
  Warnings:

  - A unique constraint covering the columns `[farmerId,productId,txnId]` on the table `FarmerProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productAddress]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FarmerProduct" DROP CONSTRAINT "FarmerProduct_productId_fkey";

-- DropIndex
DROP INDEX "FarmerProduct_farmerId_key";

-- DropIndex
DROP INDEX "FarmerProduct_productId_key";

-- AlterTable
ALTER TABLE "FarmerProduct" ALTER COLUMN "productId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productAddress" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "FarmerProduct_farmerId_productId_txnId_key" ON "FarmerProduct"("farmerId", "productId", "txnId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productAddress_key" ON "Product"("productAddress");
