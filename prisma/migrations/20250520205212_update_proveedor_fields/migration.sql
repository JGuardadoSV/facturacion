/*
  Warnings:

  - Made the column `nit` on table `proveedor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `empresaid` on table `proveedor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `proveedor` DROP FOREIGN KEY `proveedor_empresaid_fkey`;

-- DropIndex
DROP INDEX `proveedor_empresaid_fkey` ON `proveedor`;

-- AlterTable
ALTER TABLE `proveedor` ADD COLUMN `codActividad` VARCHAR(191) NULL,
    ADD COLUMN `codEstable` VARCHAR(191) NULL,
    ADD COLUMN `codPuntoVenta` VARCHAR(191) NULL,
    ADD COLUMN `complemento` VARCHAR(191) NULL,
    ADD COLUMN `departamento` VARCHAR(191) NULL,
    ADD COLUMN `descActividad` VARCHAR(191) NULL,
    ADD COLUMN `emailcorporativo` VARCHAR(191) NULL,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    ADD COLUMN `municipio` VARCHAR(191) NULL,
    ADD COLUMN `nombreComercial` VARCHAR(191) NULL,
    ADD COLUMN `nrc` VARCHAR(191) NULL,
    ADD COLUMN `tipoEstablecimiento` VARCHAR(191) NOT NULL DEFAULT 'MATRIZ',
    ADD COLUMN `tipoProveedor` VARCHAR(191) NOT NULL DEFAULT 'NACIONAL',
    MODIFY `nit` VARCHAR(191) NOT NULL,
    MODIFY `empresaid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `proveedor` ADD CONSTRAINT `proveedor_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;
