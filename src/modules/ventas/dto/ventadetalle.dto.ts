import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VentaDetalleDTO {
  @ApiProperty({ description: 'Cantidad del producto' })
  @IsNumber()
  cantidad: number;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'ID del producto' })
  @IsInt()
  @IsOptional()
  productoId: number;

  @ApiProperty({ description: 'Número de ítem' })
  @IsInt()
  numItem: number;

  @ApiProperty({ description: 'Tipo de ítem' })
  @IsInt()
  @IsOptional()
  tipoItem?: number;

  @ApiProperty({ description: 'Número de documento' })
  @IsString()
  @IsOptional()
  numeroDocumento?: string;

  @ApiProperty({ description: 'Código del producto' })
  @IsString()
  @IsOptional()
  codigo?: string;

  @ApiProperty({ description: 'Código de tributo' })
  @IsString()
  @IsOptional()
  codTributo?: string;

  @ApiProperty({ description: 'Unidad de medida' })
  @IsInt()
  @IsOptional()
  uniMedida?: number;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'Precio unitario' })
  @IsNumber()
  precioUni: number;

  @ApiProperty({ description: 'Monto de descuento' })
  @IsNumber()
  @IsOptional()
  montoDescu?: number;

  @ApiProperty({ description: 'Venta no sujeta' })
  @IsNumber()
  @IsOptional()
  ventaNoSuj?: number;

  @ApiProperty({ description: 'Venta exenta' })
  @IsNumber()
  @IsOptional()
  ventaExenta?: number;

  @ApiProperty({ description: 'Venta gravada' })
  @IsNumber()
  @IsOptional()
  ventaGravada?: number;

  @ApiProperty({ description: 'Tributos' })
  @IsArray()
  @IsOptional()
  tributos?: string[];

  @ApiProperty({ description: 'PSV' })
  @IsNumber()
  @IsOptional()
  psv?: number;

  @ApiProperty({ description: 'No gravado' })
  @IsNumber()
  @IsOptional()
  noGravado?: number;

  @ApiProperty({ description: 'IVA del ítem' })
  @IsNumber()
  @IsOptional()
  ivaItem?: number;
}
