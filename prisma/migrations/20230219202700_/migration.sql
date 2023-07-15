/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Made the column `quantity` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Color" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT,
ADD COLUMN     "size" TEXT,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Size" ALTER COLUMN "details" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");
