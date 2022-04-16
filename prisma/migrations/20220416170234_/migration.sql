-- AlterTable
ALTER TABLE "Anime" ALTER COLUMN "title_english" DROP NOT NULL,
ALTER COLUMN "title_japanese" DROP NOT NULL,
ALTER COLUMN "synopsis" DROP NOT NULL,
ALTER COLUMN "premiered" DROP NOT NULL;
