-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `nombrecompleto` VARCHAR(191) NULL,
    `apellidos` VARCHAR(191) NULL,
    `clave` VARCHAR(191) NULL,
    `activo` BOOLEAN NULL DEFAULT true,
    `fotografia` VARCHAR(191) NULL,
    `rol` ENUM('superadmin', 'user', 'admin') NOT NULL DEFAULT 'user',
    `empresaid` INTEGER NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresa` (
    `idempresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreempresa` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `emailcorporativo` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `iva` VARCHAR(191) NULL,
    `nit` VARCHAR(191) NOT NULL,
    `nrc` VARCHAR(191) NOT NULL,
    `codActividad` VARCHAR(191) NOT NULL,
    `descActividad` VARCHAR(191) NOT NULL,
    `nombreComercial` VARCHAR(191) NULL,
    `tipoEstablecimiento` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `complemento` VARCHAR(191) NOT NULL,
    `codEstable` VARCHAR(191) NOT NULL,
    `codPuntoVenta` VARCHAR(191) NOT NULL,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idempresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `idcliente` INTEGER NOT NULL AUTO_INCREMENT,
    `fecharegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `tipoDocumento` VARCHAR(191) NULL,
    `numDocumento` VARCHAR(191) NULL,
    `nrc` VARCHAR(191) NULL,
    `codActividad` VARCHAR(191) NULL,
    `descActividad` VARCHAR(191) NULL,
    `departamento` VARCHAR(191) NULL,
    `municipio` VARCHAR(191) NULL,
    `empresaid` INTEGER NULL,

    PRIMARY KEY (`idcliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `existencias` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NULL DEFAULT '47',
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `empresaid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoventa` INTEGER NOT NULL DEFAULT 1,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `empresaid` INTEGER NOT NULL,
    `clienteid` INTEGER NOT NULL,
    `esGranContribuyente` BOOLEAN NOT NULL DEFAULT false,
    `metodoPago` VARCHAR(191) NOT NULL,
    `pdf` VARCHAR(191) NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `ambiente` VARCHAR(191) NOT NULL DEFAULT '00',
    `tipoDte` VARCHAR(191) NOT NULL DEFAULT '01',
    `numeroControl` VARCHAR(191) NULL,
    `codigoGeneracion` VARCHAR(191) NULL,
    `tipoModelo` INTEGER NOT NULL DEFAULT 1,
    `tipoOperacion` INTEGER NOT NULL DEFAULT 1,
    `tipoContingencia` VARCHAR(191) NULL,
    `motivoContin` VARCHAR(191) NULL,
    `horEmi` VARCHAR(191) NULL,
    `tipoMoneda` VARCHAR(191) NOT NULL DEFAULT 'USD',
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
    `ivaPerci1` DOUBLE NOT NULL DEFAULT 0,
    `reteRenta` DOUBLE NOT NULL DEFAULT 0,
    `montoTotalOperacion` DOUBLE NOT NULL DEFAULT 0,
    `totalNoGravado` DOUBLE NOT NULL DEFAULT 0,
    `totalPagar` DOUBLE NOT NULL DEFAULT 0,
    `totalLetras` VARCHAR(191) NULL,
    `totalIva` DOUBLE NOT NULL DEFAULT 0,
    `saldoFavor` DOUBLE NOT NULL DEFAULT 0,
    `condicionOperacion` INTEGER NOT NULL DEFAULT 1,
    `numPagoElectronico` VARCHAR(191) NULL DEFAULT '0',
    `nombEntrega` VARCHAR(191) NULL,
    `docuEntrega` VARCHAR(191) NULL,
    `nombRecibe` VARCHAR(191) NULL,
    `docuRecibe` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `placaVehiculo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `venta_numeroControl_key`(`numeroControl`),
    UNIQUE INDEX `venta_codigoGeneracion_key`(`codigoGeneracion`),
    INDEX `venta_empresaid_idx`(`empresaid`),
    INDEX `venta_clienteid_idx`(`clienteid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ventadetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` DOUBLE NOT NULL,
    `precio` DOUBLE NOT NULL,
    `productoid` INTEGER NOT NULL,
    `ventaid` INTEGER NOT NULL,
    `numItem` INTEGER NOT NULL,
    `tipoItem` INTEGER NOT NULL DEFAULT 1,
    `numeroDocumento` VARCHAR(191) NULL,
    `codigo` VARCHAR(191) NULL,
    `codTributo` VARCHAR(191) NULL,
    `uniMedida` INTEGER NOT NULL DEFAULT 59,
    `descripcion` VARCHAR(191) NOT NULL,
    `precioUni` DOUBLE NOT NULL,
    `montoDescu` DOUBLE NOT NULL DEFAULT 0,
    `ventaNoSuj` DOUBLE NOT NULL DEFAULT 0,
    `ventaExenta` DOUBLE NOT NULL DEFAULT 0,
    `ventaGravada` DOUBLE NOT NULL DEFAULT 0,
    `tributos` VARCHAR(191) NULL,
    `psv` DOUBLE NOT NULL DEFAULT 0,
    `noGravado` DOUBLE NOT NULL DEFAULT 0,
    `ivaItem` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecharegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombre` VARCHAR(191) NOT NULL,
    `nombreComercial` VARCHAR(191) NULL,
    `nit` VARCHAR(191) NOT NULL,
    `nrc` VARCHAR(191) NULL,
    `codActividad` VARCHAR(191) NULL,
    `descActividad` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailcorporativo` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVO',
    `tipoProveedor` VARCHAR(191) NOT NULL DEFAULT 'NACIONAL',
    `departamento` VARCHAR(191) NULL,
    `municipio` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `tipoEstablecimiento` VARCHAR(191) NOT NULL DEFAULT 'MATRIZ',
    `codEstable` VARCHAR(191) NULL,
    `codPuntoVenta` VARCHAR(191) NULL,
    `iva` VARCHAR(191) NULL,
    `empresaid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `iva` DOUBLE NOT NULL,
    `numerofactura` INTEGER NOT NULL,
    `empresaid` INTEGER NOT NULL,
    `proveedorid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compradetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `productoid` INTEGER NOT NULL,
    `compraid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteid_fkey` FOREIGN KEY (`clienteid`) REFERENCES `cliente`(`idcliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ventadetalle` ADD CONSTRAINT `ventadetalle_productoid_fkey` FOREIGN KEY (`productoid`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ventadetalle` ADD CONSTRAINT `ventadetalle_ventaid_fkey` FOREIGN KEY (`ventaid`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proveedor` ADD CONSTRAINT `proveedor_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_proveedorid_fkey` FOREIGN KEY (`proveedorid`) REFERENCES `proveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compradetalle` ADD CONSTRAINT `compradetalle_productoid_fkey` FOREIGN KEY (`productoid`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compradetalle` ADD CONSTRAINT `compradetalle_compraid_fkey` FOREIGN KEY (`compraid`) REFERENCES `compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
