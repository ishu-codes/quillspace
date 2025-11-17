/*
  Warnings:

  - You are about to drop the `Draft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Draft" DROP CONSTRAINT "Draft_authorId_fkey";

-- AlterTable
ALTER TABLE "Reaction" ALTER COLUMN "type" SET DEFAULT 'like';

-- DropTable
DROP TABLE "public"."Draft";

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "itemsCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostList" (
    "postId" INTEGER NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "PostList_pkey" PRIMARY KEY ("postId","listId")
);

-- CreateTable
CREATE TABLE "UserSavedList" (
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "UserSavedList_pkey" PRIMARY KEY ("userId","listId")
);

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostList" ADD CONSTRAINT "PostList_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostList" ADD CONSTRAINT "PostList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
