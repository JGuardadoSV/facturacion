-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `empresaId` INTEGER NULL,
    MODIFY `rol` ENUM('SUPERADMIN', 'USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Empresa` (
    `idEmpresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreEmpresa` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idEmpresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE SET NULL ON UPDATE CASCADE;
