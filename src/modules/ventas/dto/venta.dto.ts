import { IsArray, IsInt, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VentaDetalleDTO } from './ventadetalle.dto';

export class CreateVentaDTO {
  @ApiProperty({ description: 'Tipo de venta (1: CF, 2: CCF, etc.)' })
  @IsInt()
  tipoventa: number;

  @ApiProperty({ description: 'Total de la venta' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'ID del cliente' })
  @IsInt()
  clienteid: number;

  @ApiProperty({ description: 'ID de la empresa' })
  @IsInt()
  empresaid: number;

  @ApiProperty({ description: 'Detalles de la venta', type: [VentaDetalleDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VentaDetalleDTO)
  detalles: VentaDetalleDTO[];
}
