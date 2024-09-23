/*
  Warnings:

  - Added the required column `direccion` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailcorporativo` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iva` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nit` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `direccion` VARCHAR(191) NOT NULL,
    ADD COLUMN `emailcorporativo` VARCHAR(191) NOT NULL,
    ADD COLUMN `iva` VARCHAR(191) NOT NULL,
    ADD COLUMN `nit` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NOT NULL;
