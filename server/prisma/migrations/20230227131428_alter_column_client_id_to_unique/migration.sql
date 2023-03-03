/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `balances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "balances_clientId_key" ON "balances"("clientId");
