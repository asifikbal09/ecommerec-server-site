/*
  Warnings:

  - You are about to drop the `ManagerProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `adminProfiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userProfiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ManagerProfile" DROP CONSTRAINT "ManagerProfile_email_fkey";

-- DropForeignKey
ALTER TABLE "adminProfiles" DROP CONSTRAINT "adminProfiles_email_fkey";

-- DropForeignKey
ALTER TABLE "userProfiles" DROP CONSTRAINT "userProfiles_email_fkey";

-- DropTable
DROP TABLE "ManagerProfile";

-- DropTable
DROP TABLE "adminProfiles";

-- DropTable
DROP TABLE "userProfiles";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "GenderEnum";

-- DropEnum
DROP TYPE "RoleEnum";
