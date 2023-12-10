/*
  Warnings:

  - Added the required column `coverImage` to the `coffees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coffees" ADD COLUMN     "coverImage" TEXT NOT NULL;
