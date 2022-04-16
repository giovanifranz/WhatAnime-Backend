-- CreateTable
CREATE TABLE "anime" (
    "mal_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_english" TEXT,
    "title_japanese" TEXT,
    "year" INTEGER,
    "score" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "synopsis" TEXT,
    "status" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "aired_string" TEXT NOT NULL,
    "premiered" TEXT,
    "rating" TEXT NOT NULL,
    "episodes" INTEGER,
    "user_id" TEXT,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("mal_id")
);

-- CreateTable
CREATE TABLE "quote" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "character" TEXT NOT NULL,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "authUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "anime_mal_id_key" ON "anime"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "anime_title_key" ON "anime"("title");

-- CreateIndex
CREATE UNIQUE INDEX "quote_quote_key" ON "quote"("quote");

-- CreateIndex
CREATE UNIQUE INDEX "user_authUser_key" ON "user"("authUser");

-- AddForeignKey
ALTER TABLE "anime" ADD CONSTRAINT "anime_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
