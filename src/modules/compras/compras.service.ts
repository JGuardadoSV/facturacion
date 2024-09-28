import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, compra as Compra } from '@prisma/client';

@Injectable()
export class ComprasService {
  constructor(private prisma: PrismaService) {}

  async createCompra(data: Prisma.compraCreateInput): Promise<Compra> {
    console.log(data);
    return this.prisma.compra.create({
      data,
      include: {
        detalles: true,
      },
    });
  }

  async compra(idcompra: number, empresaId: number): Promise<any[]> {
    const compras = await this.prisma.compra.findMany({
      where: {
        empresaid: empresaId,
        id: idcompra,
      },
      include: {
        empresa: true,
        detalles: {
          include: {
            producto: true,
          },
        },
        proveedor: true,
      },
    });

    return compras.map((compra) => ({
      id: compra.id,
      fecha: compra.fecha,
      total: compra.total,
      iva: compra.iva,
      proveedorNombre: compra.proveedor.nombre,
      empresaNombre: compra.empresa.nombreempresa,
      detalles: compra.detalles.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoNombre: detalle.producto.nombre,
      })),
    }));
  }

  /*
  async venta(idventa: number, empresaId: number): Promise<Venta[]> {
    return this.prisma.venta.findMany({
      where: {
        empresaId: empresaId,
        id: idventa,
      },
      include: {
        Empresa: true,
        detalles: {
          include: {
            producto: true, // Asegúrate de que el nombre de la relación sea correcto
          },
        },
        Cliente: true,
      },
    });
}*/
  async compras(
    empresaId: number,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<any[]> {
    const fechaInicioSinHora = new Date(
      fechaInicio.toISOString().split('T')[0],
    );
    const fechaFinSinHora = new Date(fechaFin.toISOString().split('T')[0]);

    const compras = await this.prisma.compra.findMany({
      where: {
        empresaid: empresaId,
        fecha: {
          gte: fechaInicioSinHora,
          lt: new Date(fechaFinSinHora.getTime() + 24 * 60 * 60 * 1000), // Agregar un día para incluir la fecha final completa
        },
      },
      include: {
        empresa: true,
        detalles: {
          include: {
            producto: true,
          },
        },
        proveedor: true,
      },
    });

    return compras.map((compra) => ({
      id: compra.id,
      factura: compra.numerofactura,
      fecha: compra.fecha,
      total: compra.total,
      proveedorNombre: compra.proveedor.nombre,
      empresaNombre: compra.empresa.nombreempresa,
      detalles: compra.detalles.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoNombre: detalle.producto.nombre,
      })),
    }));
  }

  /*async ventas(
    empresaId: number,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<Venta[]> {
    const fechaInicioSinHora = new Date(
      fechaInicio.toISOString().split('T')[0],
    );
    const fechaFinSinHora = new Date(fechaFin.toISOString().split('T')[0]);

    return this.prisma.venta.findMany({
      where: {
        empresaId: empresaId,
        fecha: {
          gte: fechaInicioSinHora,
          lt: new Date(fechaFinSinHora.getTime() + 24 * 60 * 60 * 1000), // Agregar un día para incluir la fecha final completa
        },
      },
      include: {
        Empresa: true,
        detalles: {
          include: {
            producto: true, // Asegúrate de que el nombre de la relación sea correcto
          },
        },
        Cliente: true,
      },
    });
  }*/
}
