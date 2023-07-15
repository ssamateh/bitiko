/*
  Warnings:

  - You are about to drop the column `category_id` on the `SecondaryCategory` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `SecondaryCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId,categoryId]` on the table `SecondaryCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `SecondaryCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `SecondaryCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SecondaryCategory" DROP CONSTRAINT "SecondaryCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "SecondaryCategory" DROP CONSTRAINT "SecondaryCategory_product_id_fkey";

-- DropIndex
DROP INDEX "product_id_category_id_unique";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "is_primary_category" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SecondaryCategory" DROP COLUMN "category_id",
DROP COLUMN "product_id",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SecondaryCategory_productId_categoryId_key" ON "SecondaryCategory"("productId", "categoryId");

-- AddForeignKey
ALTER TABLE "SecondaryCategory" ADD CONSTRAINT "SecondaryCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecondaryCategory" ADD CONSTRAINT "SecondaryCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
