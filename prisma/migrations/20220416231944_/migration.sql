/*
  Warnings:

  - A unique constraint covering the columns `[quote]` on the table `quote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quote_quote_key" ON "quote"("quote");
