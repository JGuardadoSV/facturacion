import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, venta as Venta } from '@prisma/client';
import { VentaDTO } from './dto/venta.dto';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) {}

  async create(ventaDTO: VentaDTO) {
    try {
      const { detalles, tipoVenta, esGranContribuyente, ...ventaData } =
        ventaDTO;
      console.log('Datos de venta recibidos:', ventaDTO);

      // Calcular totales
      const totalGravada = detalles.reduce(
        (sum, detalle) => sum + (detalle.ventaGravada || 0),
        0,
      );
      const totalExenta = detalles.reduce(
        (sum, detalle) => sum + (detalle.ventaExenta || 0),
        0,
      );
      const totalNoSuj = detalles.reduce(
        (sum, detalle) => sum + (detalle.ventaNoSuj || 0),
        0,
      );
      const totalDescu = detalles.reduce(
        (sum, detalle) => sum + (detalle.montoDescu || 0),
        0,
      );
      const totalIva = detalles.reduce(
        (sum, detalle) => sum + (detalle.ivaItem || 0),
        0,
      );

      // Calcular subtotales
      const subTotalVentas = totalGravada + totalExenta + totalNoSuj;
      const subTotal = subTotalVentas - totalDescu;

      // Calcular montos finales
      const montoTotalOperacion = subTotal + totalIva;
      const totalPagar = montoTotalOperacion;

      // Crear la venta con sus detalles en una transacción
      return await this.prisma.$transaction(async (prisma) => {
        try {
          // Crear la venta
          const venta = await prisma.venta.create({
            data: {
              ...ventaData,
              tipoventa: tipoVenta,
              // Campos calculados
              totalGravada: ventaData.totalGravada || 0,
              totalExenta: ventaData.totalExenta || 0,
              totalNoSuj: ventaData.totalNoSuj || 0,
              subTotalVentas: ventaData.subTotalVentas || 0,
              descuNoSuj: ventaData.descuNoSuj || 0,
              descuExenta: ventaData.descuExenta || 0,
              descuGravada: ventaData.descuGravada || 0,
              totalDescu: ventaData.totalDescu || 0,
              subTotal: ventaData.subTotal || 0,
              ivaRete1: ventaData.ivaRete1 || 0,
              ivaPerci1: esGranContribuyente ? ventaData.ivaPerci1 || 0 : 0,
              reteRenta: ventaData.reteRenta || 0,
              montoTotalOperacion: ventaData.montoTotalOperacion || 0,
              totalPagar: ventaData.totalPagar || 0,
              totalLetras: ventaData.totalLetras,
              totalIva: ventaData.totalIva || 0,
              // Campos opcionales con valores por defecto
              condicionOperacion: ventaData.condicionOperacion || 1,
              detalles: {
                create: detalles.map((detalle, index) => ({
                  productoid: detalle.productoid,
                  cantidad: detalle.cantidad,
                  precio: detalle.precio,
                  montoDescu: detalle.montoDescu || 0,
                  numItem: index + 1,
                  descripcion: detalle.descripcion || '',
                  precioUni: detalle.precio,
                  codigo: detalle.codigo || '',
                  uniMedida: detalle.uniMedida || 1,
                  ventaGravada: detalle.ventaGravada || 0,
                  ventaExenta: detalle.ventaExenta || 0,
                  ventaNoSuj: detalle.ventaNoSuj || 0,
                  noGravado: detalle.noGravado || 0,
                  psv: detalle.psv || 0,
                  ivaItem: detalle.ivaItem || 0,
                })),
              },
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

          // Actualizar el stock de los productos
          for (const detalle of detalles) {
            await prisma.producto.update({
              where: { id: detalle.productoid },
              data: {
                existencias: {
                  decrement: detalle.cantidad,
                },
              },
            });
          }

          return venta;
        } catch (error) {
          console.error('Error en la transacción:', error);
          throw new InternalServerErrorException(
            `Error al crear la venta: ${error.message}`,
          );
        }
      });
    } catch (error) {
      console.error('Error en el servicio de ventas:', error);
      throw new InternalServerErrorException(
        `Error al procesar la venta: ${error.message}`,
      );
    }
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
