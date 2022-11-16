const table_inits = `

CREATE TABLE IF NOT EXISTS "users"(
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "userpic_url" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "product"(
  "id" SERIAL PRIMARY KEY,
  "prod_name" VARCHAR(255) NOT NULL,
  "prod_price" INTEGER NOT NULL,
  "prod_pic_url" TEXT NOT NULL,
  "prod_description" TEXT NOT NULL,
  "prod_owner" INTEGER NOT NULL,
  "prod_release_date" DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS "cart_products"(
  "id" SERIAL PRIMARY KEY,
  "cart_product_owner" INTEGER NOT NULL,
  "cart_productid" INTEGER NOT NULL
);

ALTER TABLE "cart_products" DROP CONSTRAINT IF EXISTS "cart_products_cart_product_owner_foreign";
ALTER TABLE
  "cart_products" ADD CONSTRAINT "cart_products_cart_product_owner_foreign" FOREIGN KEY("cart_product_owner") REFERENCES "users"("id");

ALTER TABLE "cart_products" DROP CONSTRAINT IF EXISTS "cart_products_cart_productid_foreign";
ALTER TABLE
  "cart_products" ADD CONSTRAINT "cart_products_cart_productid_foreign" FOREIGN KEY("cart_productid") REFERENCES "product"("id");

ALTER TABLE "product" DROP CONSTRAINT IF EXISTS "product_prod_owner_foreign";
ALTER TABLE
  "product" ADD CONSTRAINT "product_prod_owner_foreign" FOREIGN KEY("prod_owner") REFERENCES "users"("id");`;

export default table_inits;
