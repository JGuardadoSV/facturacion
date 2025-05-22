import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VentaDetalleDTO } from './ventadetalle.dto';
import { Transform } from 'class-transformer';

export enum TipoVenta {
  CONSUMIDOR_FINAL = 1,
  CREDITO_FISCAL = 2,
}

export class VentaDTO {
  @ApiProperty({ description: 'ID de la venta' })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ description: 'Tipo de venta', enum: TipoVenta })
  @IsEnum(TipoVenta)
  tipoVenta: TipoVenta;

  @ApiProperty({ description: 'Fecha de la venta' })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  fecha?: Date;

  @ApiProperty({ description: 'Total de la venta' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'ID de la empresa' })
  @IsInt()
  empresaid: number;

  @ApiProperty({ description: 'ID del cliente' })
  @IsInt()
  clienteid: number;

  @ApiProperty({ description: 'Detalles de la venta', type: [VentaDetalleDTO] })
  @IsArray()
  detalles: VentaDetalleDTO[];

  @ApiProperty({ description: 'Es gran contribuyente' })
  @IsBoolean()
  @IsOptional()
  esGranContribuyente?: boolean;

  @ApiProperty({ description: 'Método de pago' })
  @IsString()
  metodoPago: string;

  @ApiProperty({ description: 'Versión del DTE' })
  @IsInt()
  @IsOptional()
  version?: number;

  @ApiProperty({ description: 'Ambiente' })
  @IsString()
  @IsOptional()
  ambiente?: string;

  @ApiProperty({ description: 'Tipo de DTE' })
  @IsString()
  @IsOptional()
  tipoDte?: string;

  @ApiProperty({ description: 'Número de control' })
  @IsString()
  @IsOptional()
  numeroControl?: string;

  @ApiProperty({ description: 'Código de generación' })
  @IsString()
  @IsOptional()
  codigoGeneracion?: string;

  @ApiProperty({ description: 'Tipo de modelo' })
  @IsInt()
  @IsOptional()
  tipoModelo?: number;

  @ApiProperty({ description: 'Tipo de operación' })
  @IsInt()
  @IsOptional()
  tipoOperacion?: number;

  // Nuevos campos para facturación
  @ApiProperty({ description: 'Tipo de contingencia' })
  @IsString()
  @IsOptional()
  tipoContingencia?: string;

  @ApiProperty({ description: 'Motivo de contingencia' })
  @IsString()
  @IsOptional()
  motivoContin?: string;

  @ApiProperty({ description: 'Hora de emisión' })
  @IsString()
  @IsOptional()
  horEmi?: string;

  @ApiProperty({ description: 'Tipo de moneda' })
  @IsString()
  tipoMoneda: string;

  // Campos de resumen
  @ApiProperty({ description: 'Total no sujeto' })
  @IsNumber()
  @IsOptional()
  totalNoSuj?: number;

  @ApiProperty({ description: 'Total exento' })
  @IsNumber()
  @IsOptional()
  totalExenta?: number;

  @ApiProperty({ description: 'Total gravado' })
  @IsNumber()
  @IsOptional()
  totalGravada?: number;

  @ApiProperty({ description: 'Sub total ventas' })
  @IsNumber()
  @IsOptional()
  subTotalVentas?: number;

  @ApiProperty({ description: 'Descuentos y rebajas' })
  @IsNumber()
  @IsOptional()
  descuNoSuj?: number;

  @ApiProperty({ description: 'Descuentos y rebajas exentos' })
  @IsNumber()
  @IsOptional()
  descuExenta?: number;

  @ApiProperty({ description: 'Descuentos y rebajas gravados' })
  @IsNumber()
  @IsOptional()
  descuGravada?: number;

  @ApiProperty({ description: 'Total de descuentos' })
  @IsNumber()
  @IsOptional()
  totalDescu?: number;

  @ApiProperty({ description: 'Sub total' })
  @IsNumber()
  @IsOptional()
  subTotal?: number;

  @ApiProperty({ description: 'IVA retenido' })
  @IsNumber()
  @IsOptional()
  ivaRete1?: number;

  @ApiProperty({ description: 'IVA percibido' })
  @IsNumber()
  @IsOptional()
  ivaPerci1?: number;

  @ApiProperty({ description: 'Rete renta' })
  @IsNumber()
  @IsOptional()
  reteRenta?: number;

  @ApiProperty({ description: 'Monto total operación' })
  @IsNumber()
  @IsOptional()
  montoTotalOperacion?: number;

  @ApiProperty({ description: 'Total a pagar' })
  @IsNumber()
  @IsOptional()
  totalPagar?: number;

  @ApiProperty({ description: 'Total letras' })
  @IsString()
  @IsOptional()
  totalLetras?: string;

  @ApiProperty({ description: 'Total IVA' })
  @IsNumber()
  @IsOptional()
  totalIva?: number;

  @ApiProperty({ description: 'Condición de operación' })
  @IsInt()
  @IsOptional()
  condicionOperacion?: number;

  @ApiProperty({ description: 'Observaciones de la venta' })
  @IsString()
  @IsOptional()
  observaciones?: string;

  @ApiProperty({ description: 'Número de documento' })
  @IsString()
  @IsOptional()
  numeroDocumento?: string;

  @ApiProperty({ description: 'Fecha de emisión' })
  @IsString()
  @IsOptional()
  fechaEmision?: string;

  @ApiProperty({ description: 'Usuario' })
  @IsString()
  @IsOptional()
  usuario?: string;

  @ApiProperty({ description: 'Tipo de documento' })
  @IsInt()
  @IsOptional()
  tipoDocumento?: number;

  @ApiProperty({ description: 'Documento' })
  @IsString()
  @IsOptional()
  documento?: string;

  @ApiProperty({ description: 'NIT' })
  @IsString()
  @IsOptional()
  nit?: string;

  @ApiProperty({ description: 'NRC' })
  @IsString()
  @IsOptional()
  nrc?: string;

  @ApiProperty({ description: 'Nombre' })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({ description: 'Código de actividad' })
  @IsString()
  @IsOptional()
  codActividad?: string;

  @ApiProperty({ description: 'Descripción de actividad' })
  @IsString()
  @IsOptional()
  descActividad?: string;

  @ApiProperty({ description: 'Nombre comercial' })
  @IsString()
  @IsOptional()
  nombreComercial?: string;

  @ApiProperty({ description: 'Tipo de establecimiento' })
  @IsInt()
  @IsOptional()
  tipoEstablecimiento?: number;

  @ApiProperty({ description: 'Dirección' })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({ description: 'Teléfono' })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ description: 'Correo' })
  @IsString()
  @IsOptional()
  correo?: string;

  @ApiProperty({ description: 'Código postal' })
  @IsString()
  @IsOptional()
  codPostal?: string;

  @ApiProperty({ description: 'Municipio' })
  @IsString()
  @IsOptional()
  municipio?: string;

  @ApiProperty({ description: 'Departamento' })
  @IsString()
  @IsOptional()
  departamento?: string;

  @ApiProperty({ description: 'País' })
  @IsString()
  @IsOptional()
  pais?: string;

  @ApiProperty({ description: 'Complemento' })
  @IsString()
  @IsOptional()
  complemento?: string;

  @ApiProperty({ description: 'Código de sucursal' })
  @IsString()
  @IsOptional()
  codSucursal?: string;

  @ApiProperty({ description: 'Punto de venta' })
  @IsString()
  @IsOptional()
  puntoVenta?: string;

  @ApiProperty({ description: 'Teléfono de establecimiento' })
  @IsString()
  @IsOptional()
  telefonoEstablecimiento?: string;

  @ApiProperty({ description: 'Correo de establecimiento' })
  @IsString()
  @IsOptional()
  correoEstablecimiento?: string;
}
