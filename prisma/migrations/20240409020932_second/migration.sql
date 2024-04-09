/*
  Warnings:

  - You are about to drop the column `product` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0;
