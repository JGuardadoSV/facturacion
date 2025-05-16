import { ApiProperty } from '@nestjs/swagger';

export class IdentificacionTipo2Dto {
  @ApiProperty({ description: 'Versión del DTE' })
  version: number;

  @ApiProperty({ description: 'Ambiente' })
  ambiente: string;

  @ApiProperty({ description: 'Tipo de DTE' })
  tipoDte: string;

  @ApiProperty({ description: 'Número de control' })
  numeroControl: string;

  @ApiProperty({ description: 'Código de generación' })
  codigoGeneracion: string;

  @ApiProperty({ description: 'Tipo de modelo' })
  tipoModelo: number;

  @ApiProperty({ description: 'Tipo de operación' })
  tipoOperacion: number;

  @ApiProperty({ description: 'Tipo de contingencia', nullable: true })
  tipoContingencia: string | null;

  @ApiProperty({ description: 'Motivo de contingencia', nullable: true })
  motivoContin: string | null;

  @ApiProperty({ description: 'Fecha de emisión' })
  fecEmi: string;

  @ApiProperty({ description: 'Hora de emisión' })
  horEmi: string;

  @ApiProperty({ description: 'Tipo de moneda' })
  tipoMoneda: string;
}

export class DireccionDto {
  @ApiProperty({ description: 'Departamento' })
  departamento: string;

  @ApiProperty({ description: 'Municipio' })
  municipio: string;

  @ApiProperty({ description: 'Complemento' })
  complemento: string;
}

export class EmisorTipo2Dto {
  @ApiProperty({ description: 'NIT' })
  nit: string;

  @ApiProperty({ description: 'NRC' })
  nrc: string;

  @ApiProperty({ description: 'Nombre' })
  nombre: string;

  @ApiProperty({ description: 'Código de actividad' })
  codActividad: string;

  @ApiProperty({ description: 'Descripción de actividad' })
  descActividad: string;

  @ApiProperty({ description: 'Nombre comercial' })
  nombreComercial: string;

  @ApiProperty({ description: 'Tipo de establecimiento' })
  tipoEstablecimiento: string;

  @ApiProperty({ description: 'Dirección', type: DireccionDto })
  direccion: DireccionDto;

  @ApiProperty({ description: 'Teléfono' })
  telefono: string;

  @ApiProperty({ description: 'Código establecimiento MH', nullable: true })
  codEstableMH: string | null;

  @ApiProperty({ description: 'Código establecimiento' })
  codEstable: string;

  @ApiProperty({ description: 'Código punto venta MH', nullable: true })
  codPuntoVentaMH: string | null;

  @ApiProperty({ description: 'Código punto venta' })
  codPuntoVenta: string;

  @ApiProperty({ description: 'Correo electrónico' })
  correo: string;
}

export class ReceptorTipo2Dto {
  @ApiProperty({ description: 'NIT' })
  nit: string;

  @ApiProperty({ description: 'NRC' })
  nrc: string;

  @ApiProperty({ description: 'Nombre' })
  nombre: string;

  @ApiProperty({ description: 'Nombre comercial', nullable: true })
  nombreComercial: string | null;

  @ApiProperty({ description: 'Código de actividad' })
  codActividad: string;

  @ApiProperty({ description: 'Descripción de actividad' })
  descActividad: string;

  @ApiProperty({ description: 'Dirección', type: DireccionDto })
  direccion: DireccionDto;

  @ApiProperty({ description: 'Teléfono' })
  telefono: string;

  @ApiProperty({ description: 'Correo electrónico' })
  correo: string;
}

export class CuerpoDocumentoTipo2Dto {
  @ApiProperty({ description: 'Número de ítem' })
  numItem: number;

  @ApiProperty({ description: 'Tipo de ítem' })
  tipoItem: number;

  @ApiProperty({ description: 'Número de documento', nullable: true })
  numeroDocumento: string | null;

  @ApiProperty({ description: 'Cantidad' })
  cantidad: number;

  @ApiProperty({ description: 'Código' })
  codigo: string;

  @ApiProperty({ description: 'Código de tributo', nullable: true })
  codTributo: string | null;

  @ApiProperty({ description: 'Unidad de medida' })
  uniMedida: number;

  @ApiProperty({ description: 'Descripción' })
  descripcion: string;

  @ApiProperty({ description: 'Precio unitario' })
  precioUni: number;

  @ApiProperty({ description: 'Monto de descuento' })
  montoDescu: number;

  @ApiProperty({ description: 'Venta no sujeta' })
  ventaNoSuj: number;

  @ApiProperty({ description: 'Venta exenta' })
  ventaExenta: number;

  @ApiProperty({ description: 'Venta gravada' })
  ventaGravada: number;

  @ApiProperty({ description: 'Tributos' })
  tributos: string[];

  @ApiProperty({ description: 'PSV' })
  psv: number;

  @ApiProperty({ description: 'No gravado' })
  noGravado: number;
}

export class TributoDto {
  @ApiProperty({ description: 'Código' })
  codigo: string;

  @ApiProperty({ description: 'Descripción' })
  descripcion: string;

  @ApiProperty({ description: 'Valor' })
  valor: number;
}

export class PagoDto {
  @ApiProperty({ description: 'Código' })
  codigo: string;

  @ApiProperty({ description: 'Monto de pago' })
  montoPago: number;

  @ApiProperty({ description: 'Referencia' })
  referencia: string;

  @ApiProperty({ description: 'Período', nullable: true })
  periodo: string | null;

  @ApiProperty({ description: 'Plazo', nullable: true })
  plazo: string | null;
}

export class ResumenTipo2Dto {
  @ApiProperty({ description: 'Total no sujeto' })
  totalNoSuj: number;

  @ApiProperty({ description: 'Total exento' })
  totalExenta: number;

  @ApiProperty({ description: 'Total gravado' })
  totalGravada: number;

  @ApiProperty({ description: 'Subtotal de ventas' })
  subTotalVentas: number;

  @ApiProperty({ description: 'Descuento no sujeto' })
  descuNoSuj: number;

  @ApiProperty({ description: 'Descuento exento' })
  descuExenta: number;

  @ApiProperty({ description: 'Descuento gravado' })
  descuGravada: number;

  @ApiProperty({ description: 'Porcentaje de descuento' })
  porcentajeDescuento: number;

  @ApiProperty({ description: 'Total descuento' })
  totalDescu: number;

  @ApiProperty({ description: 'Subtotal' })
  subTotal: number;

  @ApiProperty({ description: 'IVA retenido' })
  ivaRete1: number;

  @ApiProperty({ description: 'IVA percibido' })
  ivaPerci1: number;

  @ApiProperty({ description: 'Retención de renta' })
  reteRenta: number;

  @ApiProperty({ description: 'Monto total de la operación' })
  montoTotalOperacion: number;

  @ApiProperty({ description: 'Total no gravado' })
  totalNoGravado: number;

  @ApiProperty({ description: 'Total a pagar' })
  totalPagar: number;

  @ApiProperty({ description: 'Total en letras' })
  totalLetras: string;

  @ApiProperty({ description: 'Saldo a favor' })
  saldoFavor: number;

  @ApiProperty({ description: 'Condición de operación' })
  condicionOperacion: number;

  @ApiProperty({ description: 'Pagos', type: [PagoDto] })
  pagos: PagoDto[];

  @ApiProperty({ description: 'Tributos', type: [TributoDto] })
  tributos: TributoDto[];

  @ApiProperty({ description: 'Número de pago electrónico' })
  numPagoElectronico: string;
}

export class ExtensionTipo2Dto {
  @ApiProperty({ description: 'Nombre de entrega' })
  nombEntrega: string;

  @ApiProperty({ description: 'Documento de entrega' })
  docuEntrega: string;

  @ApiProperty({ description: 'Nombre de recibe', nullable: true })
  nombRecibe: string | null;

  @ApiProperty({ description: 'Documento de recibe', nullable: true })
  docuRecibe: string | null;

  @ApiProperty({ description: 'Observaciones', nullable: true })
  observaciones: string | null;

  @ApiProperty({ description: 'Placa de vehículo', nullable: true })
  placaVehiculo: string | null;
}

export class DteTipo2Dto {
  @ApiProperty({ description: 'Identificación', type: IdentificacionTipo2Dto })
  identificacion: IdentificacionTipo2Dto;

  @ApiProperty({ description: 'Documento relacionado', nullable: true })
  documentoRelacionado: any | null;

  @ApiProperty({ description: 'Emisor', type: EmisorTipo2Dto })
  emisor: EmisorTipo2Dto;

  @ApiProperty({ description: 'Receptor', type: ReceptorTipo2Dto })
  receptor: ReceptorTipo2Dto;

  @ApiProperty({ description: 'Venta a tercero', nullable: true })
  ventaTercero: any | null;

  @ApiProperty({
    description: 'Cuerpo del documento',
    type: [CuerpoDocumentoTipo2Dto],
  })
  cuerpoDocumento: CuerpoDocumentoTipo2Dto[];

  @ApiProperty({ description: 'Resumen', type: ResumenTipo2Dto })
  resumen: ResumenTipo2Dto;

  @ApiProperty({ description: 'Extensión', type: ExtensionTipo2Dto })
  extension: ExtensionTipo2Dto;

  @ApiProperty({ description: 'Otros documentos', nullable: true })
  otrosDocumentos: any | null;

  @ApiProperty({ description: 'Apéndice', nullable: true })
  apendice: any | null;
}
