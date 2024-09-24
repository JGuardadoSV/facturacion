-- DropForeignKey
ALTER TABLE `proveedor` DROP FOREIGN KEY `Proveedor_empresaId_fkey`;

-- AlterTable
ALTER TABLE `proveedor` MODIFY `empresaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Proveedor` ADD CONSTRAINT `Proveedor_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE SET NULL ON UPDATE CASCADE;
