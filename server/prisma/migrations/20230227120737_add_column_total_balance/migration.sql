/*
  Warnings:

  - Added the required column `totalBalance` to the `balances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balances" ADD COLUMN     "totalBalance" DECIMAL(65,30) NOT NULL;
