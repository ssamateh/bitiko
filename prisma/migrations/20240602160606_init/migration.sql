-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('USER', 'AGENT', 'ADMIN');

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "details" VARCHAR(256),
    "images" TEXT[],
    "ready_for_online" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "details" VARCHAR(256),
    "images" TEXT[],
    "is_primary_category" BOOLEAN NOT NULL DEFAULT false,
    "ready_for_online" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "color" VARCHAR(48) NOT NULL,
    "details" VARCHAR(256),
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION,
    "images" TEXT[],
    "ready_for_online" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "size" VARCHAR(48) NOT NULL,
    "details" VARCHAR(256),
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION,
    "images" TEXT[],
    "ready_for_online" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "name" VARCHAR(256) NOT NULL,
    "primary_category_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "details" JSONB NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION,
    "images" TEXT[],
    "color" TEXT,
    "size" TEXT,
    "ready_for_online" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "secondary_category" (
    "product_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL DEFAULT 'USER',
    "last_log_in_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brand_name_key" ON "brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "secondary_category_product_id_category_id_key" ON "secondary_category"("product_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "color" ADD CONSTRAINT "color_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size" ADD CONSTRAINT "size_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_primary_category_id_fkey" FOREIGN KEY ("primary_category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secondary_category" ADD CONSTRAINT "secondary_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secondary_category" ADD CONSTRAINT "secondary_category_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
