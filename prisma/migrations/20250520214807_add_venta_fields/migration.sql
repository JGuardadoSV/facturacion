/*
  Warnings:

  - You are about to alter the column `cantidad` on the `ventadetalle` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - A unique constraint covering the columns `[numeroControl]` on the table `venta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoGeneracion]` on the table `venta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descripcion` to the `ventadetalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numItem` to the `ventadetalle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUni` to the `ventadetalle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `venta` ADD COLUMN `ambiente` VARCHAR(191) NOT NULL DEFAULT '00',
    ADD COLUMN `codigoGeneracion` VARCHAR(191) NULL,
    ADD COLUMN `condicionOperacion` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `descuExenta` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `descuGravada` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `descuNoSuj` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `docuEntrega` VARCHAR(191) NULL,
    ADD COLUMN `docuRecibe` VARCHAR(191) NULL,
    ADD COLUMN `horEmi` VARCHAR(191) NULL,
    ADD COLUMN `ivaPerci1` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `ivaRete1` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `montoTotalOperacion` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `motivoContin` VARCHAR(191) NULL,
    ADD COLUMN `nombEntrega` VARCHAR(191) NULL,
    ADD COLUMN `nombRecibe` VARCHAR(191) NULL,
    ADD COLUMN `numPagoElectronico` VARCHAR(191) NULL DEFAULT '0',
    ADD COLUMN `numeroControl` VARCHAR(191) NULL,
    ADD COLUMN `observaciones` VARCHAR(191) NULL,
    ADD COLUMN `placaVehiculo` VARCHAR(191) NULL,
    ADD COLUMN `porcentajeDescuento` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `reteRenta` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `saldoFavor` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `subTotal` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `subTotalVentas` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `tipoContingencia` VARCHAR(191) NULL,
    ADD COLUMN `tipoDte` VARCHAR(191) NOT NULL DEFAULT '01',
    ADD COLUMN `tipoModelo` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `tipoMoneda` VARCHAR(191) NOT NULL DEFAULT 'USD',
    ADD COLUMN `tipoOperacion` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `totalDescu` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalExenta` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalGravada` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalIva` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalLetras` VARCHAR(191) NULL,
    ADD COLUMN `totalNoGravado` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalNoSuj` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `totalPagar` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `version` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `ventadetalle` ADD COLUMN `codTributo` VARCHAR(191) NULL,
    ADD COLUMN `codigo` VARCHAR(191) NULL,
    ADD COLUMN `descripcion` VARCHAR(191) NOT NULL,
    ADD COLUMN `ivaItem` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `montoDescu` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `noGravado` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `numItem` INTEGER NOT NULL,
    ADD COLUMN `numeroDocumento` VARCHAR(191) NULL,
    ADD COLUMN `precioUni` DOUBLE NOT NULL,
    ADD COLUMN `psv` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `tipoItem` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `tributos` VARCHAR(191) NULL,
    ADD COLUMN `uniMedida` INTEGER NOT NULL DEFAULT 59,
    ADD COLUMN `ventaExenta` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `ventaGravada` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `ventaNoSuj` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `cantidad` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `venta_numeroControl_key` ON `venta`(`numeroControl`);

-- CreateIndex
CREATE UNIQUE INDEX `venta_codigoGeneracion_key` ON `venta`(`codigoGeneracion`);
