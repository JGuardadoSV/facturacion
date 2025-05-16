import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DteTipo2Dto } from './dto/dte-tipo2.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DteTipo2Service {
  constructor(private prisma: PrismaService) {}

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
      '',
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
    const centenas = [
      '',
      'ciento',
      'doscientos',
      'trescientos',
      'cuatrocientos',
      'quinientos',
      'seiscientos',
      'setecientos',
      'ochocientos',
      'novecientos',
    ];

    if (numero === 0) return 'cero';

    let resultado = '';
    const entero = Math.floor(numero);
    const decimal = Math.round((numero - entero) * 100);

    if (entero > 0) {
      if (entero === 100) {
        resultado = 'cien';
      } else {
        const c = Math.floor(entero / 100);
        const d = Math.floor((entero % 100) / 10);
        const u = entero % 10;

        if (c > 0) resultado += centenas[c] + ' ';
        if (d > 0) {
          if (d === 1 && u > 0) {
            resultado += especiales[u];
          } else {
            resultado += decenas[d];
            if (u > 0) resultado += ' y ' + unidades[u];
          }
        } else if (u > 0) {
          resultado += unidades[u];
        }
      }
    }

    if (decimal > 0) {
      resultado += ' con ' + decimal.toString().padStart(2, '0') + '/100';
    }

    return resultado.trim();
  }

  private calcularTotales(detalles: any[]): {
    totalGravada: number;
    totalIva: number;
  } {
    let totalGravada = 0;
    let totalIva = 0;

    detalles.forEach((detalle) => {
      const ventaGravada = Number(detalle.cantidad * detalle.precio);
      const ivaItem = Number(((ventaGravada / 1.13) * 0.13).toFixed(2));
      totalGravada += ventaGravada;
      totalIva += ivaItem;
    });

    return {
      totalGravada: Number(totalGravada.toFixed(2)),
      totalIva: Number(totalIva.toFixed(2)),
    };
  }

  async generarDteTipo2(
    ventaId: number,
    empresaId: number,
  ): Promise<DteTipo2Dto> {
    console.log('Buscando venta con ID:', ventaId);
    console.log('Empresa ID del token:', empresaId);

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
      console.log('Venta no encontrada');
      throw new Error('Venta no encontrada');
    }

    console.log('Venta encontrada:', {
      id: venta.id,
      empresaid: venta.empresaid,
      empresaId: empresaId,
      tipoVenta: venta.tipoventa,
    });

    if (venta.empresaid !== empresaId) {
      console.log('Error de permisos:');
      console.log('- Empresa ID de la venta:', venta.empresaid);
      console.log('- Empresa ID del token:', empresaId);
      console.log('- Tipos:', {
        ventaEmpresaid: typeof venta.empresaid,
        tokenEmpresaid: typeof empresaId,
      });
      throw new Error('No tiene permiso para acceder a esta venta');
    }

    const tipoDte = '03'; // Tipo 3 para venta tipo 2
    const numeroControl = this.generarNumeroControl(
      tipoDte,
      venta.empresa.codEstable,
    );
    const codigoGeneracion = this.generarCodigoGeneracion();
    const fecha = new Date();
    const totales = this.calcularTotales(venta.detalles);

    const dte: DteTipo2Dto = {
      identificacion: {
        version: 3,
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
        nit: venta.cliente.numDocumento,
        nrc: venta.cliente.nrc || '',
        nombre: venta.cliente.nombre,
        nombreComercial: null,
        codActividad: venta.cliente.codActividad || '',
        descActividad: venta.cliente.descActividad || '',
        direccion: {
          departamento: venta.cliente.departamento || '04',
          municipio: venta.cliente.municipio || '35',
          complemento: venta.cliente.direccion || 'COYOLITO',
        },
        telefono: venta.cliente.telefono || '',
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
          tributos: ['20'],
          psv: ventaGravada,
          noGravado: 0,
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
        subTotal: totales.totalGravada,
        ivaRete1: 0,
        ivaPerci1: 0,
        reteRenta: 0,
        montoTotalOperacion: totales.totalGravada + totales.totalIva,
        totalNoGravado: 0,
        totalPagar: totales.totalGravada + totales.totalIva,
        totalLetras: this.numeroALetras(
          Number((totales.totalGravada + totales.totalIva).toFixed(2)),
        ),
        saldoFavor: 0,
        condicionOperacion: 1,
        pagos: [
          {
            codigo: '01',
            montoPago: totales.totalGravada + totales.totalIva,
            referencia: '0000',
            periodo: null,
            plazo: null,
          },
        ],
        tributos: [
          {
            codigo: '20',
            descripcion: 'Impuesto al Valor Agregado 13%',
            valor: totales.totalIva,
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
