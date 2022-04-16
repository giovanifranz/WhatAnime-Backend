-- CreateTable
CREATE TABLE "Anime" (
    "mal_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title_english" TEXT NOT NULL,
    "title_japanese" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "aired_string" TEXT NOT NULL,
    "premiered" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "episodes" INTEGER,
    "userId" TEXT,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("mal_id")
);

-- CreateTable
CREATE TABLE "Related" (
    "mal_id" INTEGER NOT NULL,

    CONSTRAINT "Related_pkey" PRIMARY KEY ("mal_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "authUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Anime_mal_id_key" ON "Anime"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Related_mal_id_key" ON "Related"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_authUser_key" ON "User"("authUser");

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Related" ADD CONSTRAINT "Related_mal_id_fkey" FOREIGN KEY ("mal_id") REFERENCES "Anime"("mal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
