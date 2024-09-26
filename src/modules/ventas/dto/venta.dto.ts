import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VentaDetalleDTO } from './ventadetalle.dto';

export class CreateVentaDTO {
  @ApiProperty({ description: 'Tipo de venta' })
  @IsInt()
  tipoVenta: number;

  @ApiProperty({ description: 'Total de la venta' })
  @IsNumber()
  total: number;

  @ApiProperty({ type: [VentaDetalleDTO], description: 'Detalles de la venta' })
  @ValidateNested({ each: true })
  @Type(() => VentaDetalleDTO)
  detalles: VentaDetalleDTO[];

  @ApiProperty({ description: 'ID de la empresa' })
  @IsInt()
  empresaId: number;

  @ApiProperty({ description: 'ID del cliente' })
  @IsInt()
  clienteId: number;
}
