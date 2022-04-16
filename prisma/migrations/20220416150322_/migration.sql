/*
  Warnings:

  - You are about to drop the `Related` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Related" DROP CONSTRAINT "Related_mal_id_fkey";

-- DropTable
DROP TABLE "Related";
