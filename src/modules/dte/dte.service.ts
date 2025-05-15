import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  DteMhDto,
  IdentificacionDto,
  EmisorDto,
  ReceptorDto,
  CuerpoDocumentoDto,
  ResumenDto,
  ExtensionDto,
} from './dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DteService {
  constructor(private prisma: PrismaService) {}

  private determinarTipoDte(tipoVenta: number): string {
    switch (tipoVenta) {
      case 1:
        return '01'; // Factura
      case 2:
        return '03'; // Crédito Fiscal
      case 3:
        return '02'; // Comprobante de Crédito Fiscal
      case 4:
        return '04'; // Comprobante de Débito Fiscal
      default:
        return '01';
    }
  }

  private generarNumeroControl(tipoDte: string, codEstable: string): string {
    const codEstableFormateado = codEstable.padStart(7, '0');
    const randomNum = Math.floor(Math.random() * 1000000000000000)
      .toString()
      .padStart(15, '0');
    return `DTE-${tipoDte}-K${codEstableFormateado}-${randomNum}`;
  }

  private generarCodigoGeneracion(): string {
    return uuidv4().toUpperCase();
  }

  private calcularTotales(detalles: any[]): {
    totalGravada: number;
    totalExenta: number;
    totalNoSuj: number;
    totalDescu: number;
    totalIva: number;
  } {
    const totales = detalles.reduce(
      (acc, detalle) => {
        const ventaGravada = Number(detalle.cantidad * detalle.precio);
        const ivaItem = Number(((ventaGravada / 1.13) * 0.13).toFixed(2));

        acc.totalGravada += ventaGravada;
        acc.totalIva += ivaItem;
        return acc;
      },
      {
        totalGravada: 0,
        totalExenta: 0,
        totalNoSuj: 0,
        totalDescu: 0,
        totalIva: 0,
      },
    );

    return {
      totalGravada: Number(totales.totalGravada.toFixed(2)),
      totalExenta: 0,
      totalNoSuj: 0,
      totalDescu: 0,
      totalIva: Number(totales.totalIva.toFixed(6)),
    };
  }

  private numeroALetras(numero: number): string {
    const unidades = [
      '',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
    ];
    const decenas = [
      '',
      'diez',
      'veinte',
      'treinta',
      'cuarenta',
      'cincuenta',
      'sesenta',
      'setenta',
      'ochenta',
      'noventa',
    ];
    const especiales = [
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciséis',
      'diecisiete',
      'dieciocho',
      'diecinueve',
    ];
    const veintes = [
      'veinte',
      'veintiuno',
      'veintidós',
      'veintitrés',
      'veinticuatro',
      'veinticinco',
      'veintiséis',
      'veintisiete',
      'veintiocho',
      'veintinueve',
    ];

    const parteEntera = Math.floor(numero);
    const parteDecimal = Math.round((numero - parteEntera) * 100);

    function convertirGrupo(num: number): string {
      if (num === 0) return '';

      if (num < 10) return unidades[num];

      if (num < 20) return especiales[num - 10];

      if (num < 30) return veintes[num - 20];

      if (num < 100) {
        const unidad = num % 10;
        const decena = Math.floor(num / 10);
        return unidad === 0
          ? decenas[decena]
          : `${decenas[decena]} y ${unidades[unidad]}`;
      }

      if (num < 1000) {
        const resto = num % 100;
        const centena = Math.floor(num / 100);
        let texto = '';

        if (centena === 1) texto = 'ciento';
        else if (centena === 5) texto = 'quinientos';
        else if (centena === 7) texto = 'setecientos';
        else if (centena === 9) texto = 'novecientos';
        else texto = unidades[centena] + 'cientos';

        return resto === 0 ? texto : `${texto} ${convertirGrupo(resto)}`;
      }

      if (num < 1000000) {
        const resto = num % 1000;
        const miles = Math.floor(num / 1000);
        let texto = '';

        if (miles === 1) texto = 'mil';
        else texto = `${convertirGrupo(miles)} mil`;

        return resto === 0 ? texto : `${texto} ${convertirGrupo(resto)}`;
      }

      return 'número muy grande';
    }

    const letras = convertirGrupo(parteEntera);
    return `${letras} con ${parteDecimal.toString().padStart(2, '0')}/100`;
  }

  async getDteById(id: number): Promise<DteMhDto> {
    const venta = await this.prisma.venta.findUnique({
      where: { id },
      include: {
        empresa: true,
        cliente: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (!venta) {
      throw new Error('Venta no encontrada');
    }

    const tipoDte = this.determinarTipoDte(venta.tipoventa);
    const numeroControl = this.generarNumeroControl(
      tipoDte,
      venta.empresa.codEstable,
    );
    const codigoGeneracion = this.generarCodigoGeneracion();
    const fecha = new Date();
    const totales = this.calcularTotales(venta.detalles);

    const dteResponse: DteMhDto = {
      identificacion: {
        version: 1,
        ambiente: '00',
        tipoDte: tipoDte,
        numeroControl: numeroControl,
        codigoGeneracion: codigoGeneracion,
        tipoModelo: 1,
        tipoOperacion: 1,
        tipoContingencia: null,
        motivoContin: null,
        fecEmi: fecha.toISOString().split('T')[0],
        horEmi: fecha.toTimeString().split(' ')[0],
        tipoMoneda: 'USD',
      },
      documentoRelacionado: null,
      emisor: {
        nit: venta.empresa.nit,
        nrc: venta.empresa.nrc,
        nombre: venta.empresa.nombreempresa,
        codActividad: venta.empresa.codActividad,
        descActividad: venta.empresa.descActividad,
        nombreComercial: venta.empresa.nombreComercial,
        tipoEstablecimiento: venta.empresa.tipoEstablecimiento,
        direccion: {
          departamento: venta.empresa.departamento,
          municipio: venta.empresa.municipio,
          complemento: venta.empresa.direccion,
        },
        telefono: venta.empresa.telefono,
        codEstableMH: null,
        codEstable: venta.empresa.codEstable,
        codPuntoVentaMH: null,
        codPuntoVenta: venta.empresa.codPuntoVenta,
        correo: venta.empresa.emailcorporativo,
      },
      receptor: {
        tipoDocumento: venta.cliente.tipoDocumento || '37',
        numDocumento: venta.cliente.numDocumento || null,
        nrc: null,
        nombre: venta.cliente.nombre,
        codActividad: venta.cliente.codActividad || null,
        descActividad: venta.cliente.descActividad || null,
        direccion: {
          departamento: '04',
          municipio: '35',
          complemento: venta.cliente.direccion || 'COYOLITO',
        },
        telefono: venta.cliente.telefono || null,
        correo: venta.cliente.email,
      },
      ventaTercero: null,
      cuerpoDocumento: venta.detalles.map((detalle, index) => {
        const ventaGravada = Number(detalle.cantidad * detalle.precio);
        const ivaItem = Number(((ventaGravada / 1.13) * 0.13).toFixed(2));

        return {
          numItem: index + 1,
          tipoItem: 1,
          numeroDocumento: null,
          cantidad: Number(detalle.cantidad.toFixed(6)),
          codigo: detalle.producto.codigo || '47',
          codTributo: null,
          uniMedida: 59,
          descripcion: detalle.producto.nombre,
          precioUni: Number(detalle.precio.toFixed(6)),
          montoDescu: 0,
          ventaNoSuj: 0,
          ventaExenta: 0,
          ventaGravada: ventaGravada,
          tributos: null,
          psv: ventaGravada,
          noGravado: 0,
          ivaItem: ivaItem,
        };
      }),
      resumen: {
        totalNoSuj: 0,
        totalExenta: 0,
        totalGravada: totales.totalGravada,
        subTotalVentas: totales.totalGravada,
        descuNoSuj: 0,
        descuExenta: 0,
        descuGravada: 0,
        porcentajeDescuento: 0,
        totalDescu: 0,
        tributos: null,
        subTotal: totales.totalGravada,
        ivaRete1: 0,
        reteRenta: 0,
        montoTotalOperacion: totales.totalGravada,
        totalNoGravado: 0,
        totalPagar: totales.totalGravada,
        totalLetras: this.numeroALetras(
          Number(totales.totalGravada.toFixed(2)),
        ).replace(/ con \d{2}\/100 con \d{2}\/100$/, ' con $&'),
        totalIva: totales.totalIva,
        saldoFavor: 0,
        condicionOperacion: 1,
        pagos: [
          {
            codigo: '01',
            montoPago: totales.totalGravada,
            referencia: '0000',
            periodo: null,
            plazo: null,
          },
        ],
        numPagoElectronico: '0',
      },
      extension: {
        nombEntrega: 'ENCARGADO 1',
        docuEntrega: '00000000-0',
        nombRecibe: null,
        docuRecibe: null,
        observaciones: null,
        placaVehiculo: null,
      },
      otrosDocumentos: null,
      apendice: null,
    };

    return dteResponse;
  }

  async generarDte(ventaId: number): Promise<DteMhDto> {
    const venta = await this.prisma.venta.findUnique({
      where: { id: ventaId },
      include: {
        empresa: true,
        cliente: true,
        detalles: {
          include: {
            producto: true,
          },
        },
      },
    });

    if (!venta) {
      throw new Error('Venta no encontrada');
    }

    const tipoDte = this.determinarTipoDte(venta.tipoventa);
    const numeroControl = this.generarNumeroControl(
      tipoDte,
      venta.empresa.codEstable,
    );
    const codigoGeneracion = this.generarCodigoGeneracion();
    const fecha = new Date();
    const totales = this.calcularTotales(venta.detalles);

    const dte: DteMhDto = {
      identificacion: {
        version: 1,
        ambiente: '00',
        tipoDte: tipoDte,
        numeroControl: numeroControl,
        codigoGeneracion: codigoGeneracion,
        tipoModelo: 1,
        tipoOperacion: 1,
        tipoContingencia: null,
        motivoContin: null,
        fecEmi: fecha.toISOString().split('T')[0],
        horEmi: fecha.toTimeString().split(' ')[0],
        tipoMoneda: 'USD',
      },
      documentoRelacionado: null,
      emisor: {
        nit: venta.empresa.nit,
        nrc: venta.empresa.nrc,
        nombre: venta.empresa.nombreempresa,
        codActividad: venta.empresa.codActividad,
        descActividad: venta.empresa.descActividad,
        nombreComercial: venta.empresa.nombreComercial,
        tipoEstablecimiento: venta.empresa.tipoEstablecimiento,
        direccion: {
          departamento: venta.empresa.departamento,
          municipio: venta.empresa.municipio,
          complemento: venta.empresa.direccion,
        },
        telefono: venta.empresa.telefono,
        codEstableMH: null,
        codEstable: venta.empresa.codEstable,
        codPuntoVentaMH: null,
        codPuntoVenta: venta.empresa.codPuntoVenta,
        correo: venta.empresa.emailcorporativo,
      },
      receptor: {
        tipoDocumento: venta.cliente.tipoDocumento || '37',
        numDocumento: venta.cliente.numDocumento || null,
        nrc: null,
        nombre: venta.cliente.nombre,
        codActividad: venta.cliente.codActividad || null,
        descActividad: venta.cliente.descActividad || null,
        direccion: {
          departamento: '04',
          municipio: '35',
          complemento: venta.cliente.direccion || 'COYOLITO',
        },
        telefono: venta.cliente.telefono || null,
        correo: venta.cliente.email,
      },
      ventaTercero: null,
      cuerpoDocumento: venta.detalles.map((detalle, index) => {
        const ventaGravada = Number(detalle.cantidad * detalle.precio);
        const ivaItem = Number(((ventaGravada / 1.13) * 0.13).toFixed(2));

        return {
          numItem: index + 1,
          tipoItem: 1,
          numeroDocumento: null,
          cantidad: Number(detalle.cantidad.toFixed(6)),
          codigo: detalle.producto.codigo || '47',
          codTributo: null,
          uniMedida: 59,
          descripcion: detalle.producto.nombre,
          precioUni: Number(detalle.precio.toFixed(6)),
          montoDescu: 0,
          ventaNoSuj: 0,
          ventaExenta: 0,
          ventaGravada: ventaGravada,
          tributos: null,
          psv: ventaGravada,
          noGravado: 0,
          ivaItem: ivaItem,
        };
      }),
      resumen: {
        totalNoSuj: 0,
        totalExenta: 0,
        totalGravada: totales.totalGravada,
        subTotalVentas: totales.totalGravada,
        descuNoSuj: 0,
        descuExenta: 0,
        descuGravada: 0,
        porcentajeDescuento: 0,
        totalDescu: 0,
        tributos: null,
        subTotal: totales.totalGravada,
        ivaRete1: 0,
        reteRenta: 0,
        montoTotalOperacion: totales.totalGravada,
        totalNoGravado: 0,
        totalPagar: totales.totalGravada,
        totalLetras: this.numeroALetras(
          Number(totales.totalGravada.toFixed(2)),
        ).replace(/ con \d{2}\/100 con \d{2}\/100$/, ' con $&'),
        totalIva: totales.totalIva,
        saldoFavor: 0,
        condicionOperacion: 1,
        pagos: [
          {
            codigo: '01',
            montoPago: totales.totalGravada,
            referencia: '0000',
            periodo: null,
            plazo: null,
          },
        ],
        numPagoElectronico: '0',
      },
      extension: {
        nombEntrega: 'ENCARGADO 1',
        docuEntrega: '00000000-0',
        nombRecibe: null,
        docuRecibe: null,
        observaciones: null,
        placaVehiculo: null,
      },
      otrosDocumentos: null,
      apendice: null,
    };

    return dte;
  }
}
