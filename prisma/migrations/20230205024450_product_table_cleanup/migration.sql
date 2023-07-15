/*
  Warnings:

  - You are about to drop the column `primary_category_d` on the `Product` table. All the data in the column will be lost.
  - Added the required column `primary_category_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `details` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_primary_category_d_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "primary_category_d",
ADD COLUMN     "primary_category_id" INTEGER NOT NULL,
DROP COLUMN "details",
ADD COLUMN     "details" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_primary_category_id_fkey" FOREIGN KEY ("primary_category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
