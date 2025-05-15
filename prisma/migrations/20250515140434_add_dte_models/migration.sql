/*
  Warnings:

  - Added the required column `codActividad` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codEstable` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codPuntoVenta` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complemento` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descActividad` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nrc` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoEstablecimiento` to the `empresa` table without a default value. This is not possible if the table is not empty.
  - Made the column `nit` on table `empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `codActividad` VARCHAR(191) NULL,
    ADD COLUMN `departamento` VARCHAR(191) NULL,
    ADD COLUMN `descActividad` VARCHAR(191) NULL,
    ADD COLUMN `municipio` VARCHAR(191) NULL,
    ADD COLUMN `nrc` VARCHAR(191) NULL,
    ADD COLUMN `numDocumento` VARCHAR(191) NULL,
    ADD COLUMN `tipoDocumento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `codActividad` VARCHAR(191) NOT NULL,
    ADD COLUMN `codEstable` VARCHAR(191) NOT NULL,
    ADD COLUMN `codPuntoVenta` VARCHAR(191) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(191) NOT NULL,
    ADD COLUMN `departamento` VARCHAR(191) NOT NULL,
    ADD COLUMN `descActividad` VARCHAR(191) NOT NULL,
    ADD COLUMN `municipio` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombreComercial` VARCHAR(191) NULL,
    ADD COLUMN `nrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoEstablecimiento` VARCHAR(191) NOT NULL,
    MODIFY `nit` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `dte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` INTEGER NOT NULL DEFAULT 1,
    `ambiente` VARCHAR(191) NOT NULL DEFAULT '00',
    `tipoDte` VARCHAR(191) NOT NULL,
    `numeroControl` VARCHAR(191) NOT NULL,
    `codigoGeneracion` VARCHAR(191) NOT NULL,
    `tipoModelo` INTEGER NOT NULL DEFAULT 1,
    `tipoOperacion` INTEGER NOT NULL DEFAULT 1,
    `tipoContingencia` VARCHAR(191) NULL,
    `motivoContin` VARCHAR(191) NULL,
    `fecEmi` DATETIME(3) NOT NULL,
    `horEmi` VARCHAR(191) NOT NULL,
    `tipoMoneda` VARCHAR(191) NOT NULL DEFAULT 'USD',
    `empresaid` INTEGER NOT NULL,
    `clienteid` INTEGER NOT NULL,
    `totalNoSuj` DOUBLE NOT NULL DEFAULT 0,
    `totalExenta` DOUBLE NOT NULL DEFAULT 0,
    `totalGravada` DOUBLE NOT NULL DEFAULT 0,
    `subTotalVentas` DOUBLE NOT NULL DEFAULT 0,
    `descuNoSuj` DOUBLE NOT NULL DEFAULT 0,
    `descuExenta` DOUBLE NOT NULL DEFAULT 0,
    `descuGravada` DOUBLE NOT NULL DEFAULT 0,
    `porcentajeDescuento` DOUBLE NOT NULL DEFAULT 0,
    `totalDescu` DOUBLE NOT NULL DEFAULT 0,
    `subTotal` DOUBLE NOT NULL DEFAULT 0,
    `ivaRete1` DOUBLE NOT NULL DEFAULT 0,
    `reteRenta` DOUBLE NOT NULL DEFAULT 0,
    `montoTotalOperacion` DOUBLE NOT NULL DEFAULT 0,
    `totalNoGravado` DOUBLE NOT NULL DEFAULT 0,
    `totalPagar` DOUBLE NOT NULL DEFAULT 0,
    `totalLetras` VARCHAR(191) NULL,
    `totalIva` DOUBLE NOT NULL DEFAULT 0,
    `saldoFavor` DOUBLE NOT NULL DEFAULT 0,
    `condicionOperacion` INTEGER NOT NULL DEFAULT 1,
    `numPagoElectronico` VARCHAR(191) NOT NULL DEFAULT '0',
    `nombEntrega` VARCHAR(191) NULL,
    `docuEntrega` VARCHAR(191) NULL,
    `nombRecibe` VARCHAR(191) NULL,
    `docuRecibe` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `placaVehiculo` VARCHAR(191) NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `dte_numeroControl_key`(`numeroControl`),
    UNIQUE INDEX `dte_codigoGeneracion_key`(`codigoGeneracion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtedetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numItem` INTEGER NOT NULL,
    `tipoItem` INTEGER NOT NULL DEFAULT 1,
    `numeroDocumento` VARCHAR(191) NULL,
    `cantidad` DOUBLE NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `codTributo` VARCHAR(191) NULL,
    `uniMedida` INTEGER NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precioUni` DOUBLE NOT NULL,
    `montoDescu` DOUBLE NOT NULL DEFAULT 0,
    `ventaNoSuj` DOUBLE NOT NULL DEFAULT 0,
    `ventaExenta` DOUBLE NOT NULL DEFAULT 0,
    `ventaGravada` DOUBLE NOT NULL DEFAULT 0,
    `psv` DOUBLE NOT NULL,
    `noGravado` DOUBLE NOT NULL DEFAULT 0,
    `ivaItem` DOUBLE NOT NULL DEFAULT 0,
    `dteid` INTEGER NOT NULL,
    `tributos` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtepago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `montoPago` DOUBLE NOT NULL,
    `referencia` VARCHAR(191) NULL,
    `periodo` VARCHAR(191) NULL,
    `plazo` VARCHAR(191) NULL,
    `dteid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dtetributo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `dteid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dte` ADD CONSTRAINT `dte_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dte` ADD CONSTRAINT `dte_clienteid_fkey` FOREIGN KEY (`clienteid`) REFERENCES `cliente`(`idcliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtedetalle` ADD CONSTRAINT `dtedetalle_dteid_fkey` FOREIGN KEY (`dteid`) REFERENCES `dte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtepago` ADD CONSTRAINT `dtepago_dteid_fkey` FOREIGN KEY (`dteid`) REFERENCES `dte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dtetributo` ADD CONSTRAINT `dtetributo_dteid_fkey` FOREIGN KEY (`dteid`) REFERENCES `dte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
