import { IsInt, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CompraDetalleDTO } from './compradetalle.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompraDTO {
  @ApiProperty({ description: 'Número de la factura' })
  @IsInt()
  numeroFactura: number;

  @ApiProperty({ description: 'Total de la compra' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'IVA aplicado a la compra' })
  @IsInt()
  iva: number;

  @ApiProperty({
    type: [CompraDetalleDTO],
    description: 'Detalles de la compra',
  })
  @ValidateNested({ each: true })
  @Type(() => CompraDetalleDTO)
  detalles: CompraDetalleDTO[];

  @ApiProperty({ description: 'ID de la empresa' })
  @IsInt()
  empresaId: number;

  @ApiProperty({ description: 'ID del proveedor' })
  @IsInt()
  proveedorId: number;
}
