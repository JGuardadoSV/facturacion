import { ApiProperty } from '@nestjs/swagger';

export class DireccionDto {
  @ApiProperty({ description: 'Departamento' })
  departamento: string;

  @ApiProperty({ description: 'Municipio' })
  municipio: string;

  @ApiProperty({ description: 'Complemento de dirección' })
  complemento: string;
}

export class IdentificacionDto {
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

export class EmisorDto {
  @ApiProperty({ description: 'NIT del emisor' })
  nit: string;

  @ApiProperty({ description: 'NRC del emisor' })
  nrc: string;

  @ApiProperty({ description: 'Nombre del emisor' })
  nombre: string;

  @ApiProperty({ description: 'Código de actividad' })
  codActividad: string;

  @ApiProperty({ description: 'Descripción de actividad' })
  descActividad: string;

  @ApiProperty({ description: 'Nombre comercial del emisor' })
  nombreComercial: string;

  @ApiProperty({ description: 'Tipo de establecimiento' })
  tipoEstablecimiento: string;

  @ApiProperty({ description: 'Dirección del emisor', type: DireccionDto })
  direccion: DireccionDto;

  @ApiProperty({ description: 'Teléfono del emisor' })
  telefono: string;

  @ApiProperty({ description: 'Código de establecimiento MH', nullable: true })
  codEstableMH: string | null;

  @ApiProperty({ description: 'Código de establecimiento' })
  codEstable: string;

  @ApiProperty({ description: 'Código de punto de venta MH', nullable: true })
  codPuntoVentaMH: string | null;

  @ApiProperty({ description: 'Código de punto de venta' })
  codPuntoVenta: string;

  @ApiProperty({ description: 'Correo electrónico del emisor' })
  correo: string;
}

export class ReceptorDto {
  @ApiProperty({ description: 'Tipo de documento' })
  tipoDocumento: string;

  @ApiProperty({ description: 'Número de documento', nullable: true })
  numDocumento: string | null;

  @ApiProperty({ description: 'NRC', nullable: true })
  nrc: string | null;

  @ApiProperty({ description: 'Nombre del receptor' })
  nombre: string;

  @ApiProperty({ description: 'Código de actividad', nullable: true })
  codActividad: string | null;

  @ApiProperty({ description: 'Descripción de actividad', nullable: true })
  descActividad: string | null;

  @ApiProperty({ description: 'Dirección del receptor', type: DireccionDto })
  direccion: DireccionDto;

  @ApiProperty({ description: 'Teléfono', nullable: true })
  telefono: string | null;

  @ApiProperty({ description: 'Correo electrónico' })
  correo: string;
}

export class CuerpoDocumentoDto {
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

  @ApiProperty({ description: 'Tributos', nullable: true })
  tributos: string[] | null;

  @ApiProperty({ description: 'PSV' })
  psv: number;

  @ApiProperty({ description: 'No gravado' })
  noGravado: number;

  @ApiProperty({ description: 'IVA del ítem' })
  ivaItem: number;
}

export class TributoDto {
  @ApiProperty({ description: 'Código del tributo' })
  codigo: string;

  @ApiProperty({ description: 'Descripción del tributo' })
  descripcion: string;

  @ApiProperty({ description: 'Valor del tributo' })
  valor: number;
}

export class PagoDto {
  @ApiProperty({ description: 'Código de pago' })
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

export class ResumenDto {
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

  @ApiProperty({ description: 'Tributos', nullable: true })
  tributos: TributoDto[] | null;

  @ApiProperty({ description: 'Subtotal' })
  subTotal: number;

  @ApiProperty({ description: 'IVA retenido' })
  ivaRete1: number;

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

  @ApiProperty({ description: 'Total IVA' })
  totalIva: number;

  @ApiProperty({ description: 'Saldo a favor' })
  saldoFavor: number;

  @ApiProperty({ description: 'Condición de operación' })
  condicionOperacion: number;

  @ApiProperty({ description: 'Pagos' })
  pagos: PagoDto[];

  @ApiProperty({ description: 'Número de pago electrónico' })
  numPagoElectronico: string;
}

export class ExtensionDto {
  @ApiProperty({ description: 'Nombre de quien entrega' })
  nombEntrega: string;

  @ApiProperty({ description: 'Documento de quien entrega' })
  docuEntrega: string;

  @ApiProperty({ description: 'Nombre de quien recibe', nullable: true })
  nombRecibe: string | null;

  @ApiProperty({ description: 'Documento de quien recibe', nullable: true })
  docuRecibe: string | null;

  @ApiProperty({ description: 'Observaciones', nullable: true })
  observaciones: string | null;

  @ApiProperty({ description: 'Placa del vehículo', nullable: true })
  placaVehiculo: string | null;
}

export class DteMhDto {
  @ApiProperty({
    description: 'Identificación del DTE',
    type: IdentificacionDto,
  })
  identificacion: IdentificacionDto;

  @ApiProperty({ description: 'Documento relacionado', nullable: true })
  documentoRelacionado: any | null;

  @ApiProperty({ description: 'Emisor', type: EmisorDto })
  emisor: EmisorDto;

  @ApiProperty({ description: 'Receptor', type: ReceptorDto })
  receptor: ReceptorDto;

  @ApiProperty({ description: 'Venta a tercero', nullable: true })
  ventaTercero: any | null;

  @ApiProperty({
    description: 'Cuerpo del documento',
    type: [CuerpoDocumentoDto],
  })
  cuerpoDocumento: CuerpoDocumentoDto[];

  @ApiProperty({ description: 'Resumen', type: ResumenDto })
  resumen: ResumenDto;

  @ApiProperty({ description: 'Extensión', type: ExtensionDto })
  extension: ExtensionDto;

  @ApiProperty({ description: 'Otros documentos', nullable: true })
  otrosDocumentos: any | null;

  @ApiProperty({ description: 'Apéndice', nullable: true })
  apendice: any | null;
}
