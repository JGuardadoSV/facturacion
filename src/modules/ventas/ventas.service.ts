import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, venta as Venta } from '@prisma/client';
import { CreateVentaDTO } from './dto/venta.dto';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) {}

  async create(createVentaDto: CreateVentaDTO, empresaid: number) {
    return this.prisma.venta.create({
      data: {
        tipoventa: createVentaDto.tipoventa,
        total: createVentaDto.total,
        empresaid: empresaid,
        clienteid: createVentaDto.clienteid,
        detalles: {
          create: createVentaDto.detalles.map((detalle) => ({
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            producto: {
              connect: {
                id: detalle.productoId,
              },
            },
          })),
        },
      },
      include: {
        detalles: true,
      },
    });
  }

  async findAll(empresaid: number) {
    return this.prisma.venta.findMany({
      where: {
        empresaid: empresaid,
      },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
        cliente: true,
      },
    });
  }

  async findOne(id: number, empresaid: number) {
    const venta = await this.prisma.venta.findFirst({
      where: {
        id: id,
        empresaid: empresaid,
      },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
        cliente: true,
      },
    });

    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    return venta;
  }

  async venta(idventa: number, empresaid: number): Promise<any[]> {
    const ventas = await this.prisma.venta.findMany({
      where: {
        empresaid: empresaid,
        id: idventa,
      },
      include: {
        empresa: true,
        detalles: {
          include: {
            producto: true,
          },
        },
        cliente: true,
      },
    });

    return ventas.map((venta) => ({
      id: venta.id,
      tipoVenta: venta.tipoventa,
      fecha: venta.fecha,
      total: venta.total,
      clienteNombre: venta.cliente.nombre,
      empresaNombre: venta.empresa.nombreempresa,
      detalles: venta.detalles.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoNombre: detalle.producto.nombre,
      })),
    }));
  }

  /*
  async venta(idventa: number, empresaid: number): Promise<Venta[]> {
    return this.prisma.venta.findMany({
      where: {
        empresaid: empresaid,
        id: idventa,
      },
      include: {
        empresa: true,
        detalles: {
          include: {
            producto: true, // Asegúrate de que el nombre de la relación sea correcto
          },
        },
        cliente: true,
      },
    });
}*/
  async ventas(
    empresaid: number,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<any[]> {
    const fechaInicioSinHora = new Date(
      fechaInicio.toISOString().split('T')[0],
    );
    const fechaFinSinHora = new Date(fechaFin.toISOString().split('T')[0]);

    const ventas = await this.prisma.venta.findMany({
      where: {
        empresaid: empresaid,
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
        cliente: true,
      },
    });

    return ventas.map((venta) => ({
      id: venta.id,
      tipoVenta: venta.tipoventa,
      fecha: venta.fecha,
      total: venta.total,
      clienteNombre: venta.cliente.nombre,
      empresaNombre: venta.empresa.nombreempresa,
      detalles: venta.detalles.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoNombre: detalle.producto.nombre,
      })),
    }));
  }

  /*async ventas(
    empresaid: number,
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<Venta[]> {
    const fechaInicioSinHora = new Date(
      fechaInicio.toISOString().split('T')[0],
    );
    const fechaFinSinHora = new Date(fechaFin.toISOString().split('T')[0]);

    return this.prisma.venta.findMany({
      where: {
        empresaid: empresaid,
        fecha: {
          gte: fechaInicioSinHora,
          lt: new Date(fechaFinSinHora.getTime() + 24 * 60 * 60 * 1000), // Agregar un día para incluir la fecha final completa
        },
      },
      include: {
        empresa: true,
        detalles: {
          include: {
            producto: true, // Asegúrate de que el nombre de la relación sea correcto
          },
        },
        cliente: true,
      },
    });
  }*/
}
