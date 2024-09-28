-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `nombrecompleto` VARCHAR(191) NULL,
    `apellidos` VARCHAR(191) NULL,
    `clave` VARCHAR(191) NULL,
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
    `nit` VARCHAR(191) NULL,
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
    `empresaid` INTEGER NULL,

    PRIMARY KEY (`idcliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `existencias` INTEGER NOT NULL,
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
    `pdf` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ventadetalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `productoid` INTEGER NOT NULL,
    `ventaid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecharegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `iva` VARCHAR(191) NULL,
    `nit` VARCHAR(191) NULL,
    `empresaid` INTEGER NULL,

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
ALTER TABLE `proveedor` ADD CONSTRAINT `proveedor_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_empresaid_fkey` FOREIGN KEY (`empresaid`) REFERENCES `empresa`(`idempresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compra` ADD CONSTRAINT `compra_proveedorid_fkey` FOREIGN KEY (`proveedorid`) REFERENCES `proveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compradetalle` ADD CONSTRAINT `compradetalle_productoid_fkey` FOREIGN KEY (`productoid`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compradetalle` ADD CONSTRAINT `compradetalle_compraid_fkey` FOREIGN KEY (`compraid`) REFERENCES `compra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
