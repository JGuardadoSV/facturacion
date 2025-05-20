import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, venta as Venta } from '@prisma/client';
import { VentaDTO } from './dto/venta.dto';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) {}

  async create(createVentaDto: VentaDTO, empresaId: number) {
    return this.prisma.venta.create({
      data: {
        tipoventa: Number(createVentaDto.tipoVenta),
        fecha: createVentaDto.fecha,
        total: createVentaDto.total,
        empresaid: empresaId,
        clienteid: createVentaDto.clienteId,
        // Nuevos campos para facturación
        version: Number(createVentaDto.version),
        ambiente: createVentaDto.ambiente,
        tipoDte: createVentaDto.tipoDte,
        numeroControl: createVentaDto.numeroControl,
        codigoGeneracion: createVentaDto.codigoGeneracion,
        tipoModelo: Number(createVentaDto.tipoModelo),
        tipoOperacion: Number(createVentaDto.tipoOperacion),
        tipoContingencia: createVentaDto.tipoContingencia,
        motivoContin: createVentaDto.motivoContin,
        horEmi: createVentaDto.horEmi,
        tipoMoneda: createVentaDto.tipoMoneda,
        // Campos de resumen
        totalNoSuj: createVentaDto.totalNoSuj || 0,
        totalExenta: createVentaDto.totalExenta || 0,
        totalGravada: createVentaDto.totalGravada || 0,
        subTotalVentas: createVentaDto.subTotalVentas || 0,
        descuNoSuj: createVentaDto.descuNoSuj || 0,
        descuExenta: createVentaDto.descuExenta || 0,
        descuGravada: createVentaDto.descuGravada || 0,
        totalDescu: createVentaDto.totalDescu || 0,
        subTotal: createVentaDto.subTotal || 0,
        ivaRete1: createVentaDto.ivaRete1 || 0,
        reteRenta: createVentaDto.reteRenta || 0,
        montoTotalOperacion: createVentaDto.montoTotalOperacion || 0,
        totalLetras: createVentaDto.totalLetras,
        condicionOperacion: Number(createVentaDto.condicionOperacion) || 1,
        detalles: {
          create: createVentaDto.detalles.map((detalle) => ({
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            numItem: detalle.numItem,
            tipoItem: detalle.tipoItem || 1,
            numeroDocumento: detalle.numeroDocumento,
            codigo: detalle.codigo,
            codTributo: detalle.codTributo,
            uniMedida: detalle.uniMedida || 59,
            descripcion: detalle.descripcion,
            precioUni: detalle.precioUni,
            montoDescu: detalle.montoDescu || 0,
            ventaNoSuj: detalle.ventaNoSuj || 0,
            ventaExenta: detalle.ventaExenta || 0,
            ventaGravada: detalle.ventaGravada || 0,
            tributos: detalle.tributos
              ? JSON.stringify(detalle.tributos)
              : null,
            psv: detalle.psv || 0,
            noGravado: detalle.noGravado || 0,
            ivaItem: detalle.ivaItem || 0,
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

  async findAll(empresaId: number) {
    return this.prisma.venta.findMany({
      where: {
        empresaid: empresaId,
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

  async findOne(id: number, empresaId: number) {
    const venta = await this.prisma.venta.findFirst({
      where: {
        id: id,
        empresaid: empresaId,
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

  async venta(idventa: number, empresaId: number): Promise<any[]> {
    const ventas = await this.prisma.venta.findMany({
      where: {
        empresaid: empresaId,
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
      // Nuevos campos para facturación
      version: venta.version,
      ambiente: venta.ambiente,
      tipoDte: venta.tipoDte,
      numeroControl: venta.numeroControl,
      codigoGeneracion: venta.codigoGeneracion,
      tipoModelo: venta.tipoModelo,
      tipoOperacion: venta.tipoOperacion,
      tipoContingencia: venta.tipoContingencia,
      motivoContin: venta.motivoContin,
      horEmi: venta.horEmi,
      tipoMoneda: venta.tipoMoneda,
      // Campos de resumen
      totalNoSuj: venta.totalNoSuj,
      totalExenta: venta.totalExenta,
      totalGravada: venta.totalGravada,
      subTotalVentas: venta.subTotalVentas,
      descuNoSuj: venta.descuNoSuj,
      descuExenta: venta.descuExenta,
      descuGravada: venta.descuGravada,
      totalDescu: venta.totalDescu,
      subTotal: venta.subTotal,
      ivaRete1: venta.ivaRete1,
      reteRenta: venta.reteRenta,
      montoTotalOperacion: venta.montoTotalOperacion,
      totalLetras: venta.totalLetras,
      condicionOperacion: venta.condicionOperacion,
      detalles: venta.detalles.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoNombre: detalle.producto.nombre,
        numItem: detalle.numItem,
        tipoItem: detalle.tipoItem,
        numeroDocumento: detalle.numeroDocumento,
        codigo: detalle.codigo,
        codTributo: detalle.codTributo,
        uniMedida: detalle.uniMedida,
        descripcion: detalle.descripcion,
        precioUni: detalle.precioUni,
        montoDescu: detalle.montoDescu,
        ventaNoSuj: detalle.ventaNoSuj,
        ventaExenta: detalle.ventaExenta,
        ventaGravada: detalle.ventaGravada,
        tributos: detalle.tributos ? JSON.parse(detalle.tributos) : [],
        psv: detalle.psv,
        noGravado: detalle.noGravado,
        ivaItem: detalle.ivaItem,
      })),
    }));
  }

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
      // Nuevos campos para facturación
      version: venta.version,
      ambiente: venta.ambiente,
      tipoDte: venta.tipoDte,
      numeroControl: venta.numeroControl,
      codigoGeneracion: venta.codigoGeneracion,
      tipoModelo: venta.tipoModelo,
      tipoOperacion: venta.tipoOperacion,
      tipoContingencia: venta.tipoContingencia,
      motivoContin: venta.motivoContin,
      horEmi: venta.horEmi,
      tipoMoneda: venta.tipoMoneda,
      // Campos de resumen
      totalNoSuj: venta.totalNoSuj,
      totalExenta: venta.totalExenta,
      totalGravada: venta.totalGravada,
      subTotalVentas: venta.subTotalVentas,
      descuNoSuj: venta.descuNoSuj,
      descuExenta: venta.descuExenta,
      descuGravada: venta.descuGravada,
      totalDescu: venta.totalDescu,
      subTotal: venta.subTotal,
      ivaRete1: venta.ivaRete1,
      reteRenta: venta.reteRenta,
      montoTotalOperacion: venta.montoTotalOperacion,
      totalLetras: venta.totalLetras,
      condicionOperacion: venta.condicionOperacion,
      detalles: venta.detalles.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoNombre: detalle.producto.nombre,
        numItem: detalle.numItem,
        tipoItem: detalle.tipoItem,
        numeroDocumento: detalle.numeroDocumento,
        codigo: detalle.codigo,
        codTributo: detalle.codTributo,
        uniMedida: detalle.uniMedida,
        descripcion: detalle.descripcion,
        precioUni: detalle.precioUni,
        montoDescu: detalle.montoDescu,
        ventaNoSuj: detalle.ventaNoSuj,
        ventaExenta: detalle.ventaExenta,
        ventaGravada: detalle.ventaGravada,
        tributos: detalle.tributos ? JSON.parse(detalle.tributos) : [],
        psv: detalle.psv,
        noGravado: detalle.noGravado,
        ivaItem: detalle.ivaItem,
      })),
    }));
  }
}
