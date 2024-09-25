import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Venta } from '@prisma/client';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) {}

  async createVenta(data: Prisma.VentaCreateInput): Promise<Venta> {
    console.log(data);
    return this.prisma.venta.create({
      data,
      include: {
        detalles: true,
      },
    });
  }

  async venta(idventa: number, empresaId: number): Promise<any[]> {
    const ventas = await this.prisma.venta.findMany({
      where: {
        empresaId: empresaId,
        id: idventa,
      },
      include: {
        Empresa: true,
        detalles: {
          include: {
            producto: true,
          },
        },
        Cliente: true,
      },
    });

    return ventas.map((venta) => ({
      id: venta.id,
      tipoVenta: venta.tipoVenta,
      fecha: venta.fecha,
      total: venta.total,
      clienteNombre: venta.Cliente.nombre,
      empresaNombre: venta.Empresa.nombreEmpresa,
      detalles: venta.detalles.map((detalle) => ({
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
  async ventas(
    empresaId: number,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<any[]> {
    const fechaInicioSinHora = new Date(
      fechaInicio.toISOString().split('T')[0],
    );
    const fechaFinSinHora = new Date(fechaFin.toISOString().split('T')[0]);

    const ventas = await this.prisma.venta.findMany({
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
            producto: true,
          },
        },
        Cliente: true,
      },
    });

    return ventas.map((venta) => ({
      id: venta.id,
      tipoVenta: venta.tipoVenta,
      fecha: venta.fecha,
      total: venta.total,
      clienteNombre: venta.Cliente.nombre,
      empresaNombre: venta.Empresa.nombreEmpresa,
      detalles: venta.detalles.map((detalle) => ({
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