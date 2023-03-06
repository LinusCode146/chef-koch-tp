-- CreateTable
CREATE TABLE "Heart" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Heart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Heart" ADD CONSTRAINT "Heart_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart" ADD CONSTRAINT "Heart_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
