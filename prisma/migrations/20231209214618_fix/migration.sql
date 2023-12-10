/*
  Warnings:

  - You are about to drop the column `categoryId` on the `coffees` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "coffees" DROP CONSTRAINT "coffees_categoryId_fkey";

-- AlterTable
ALTER TABLE "coffees" DROP COLUMN "categoryId";
