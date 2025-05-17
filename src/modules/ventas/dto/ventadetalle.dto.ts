import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VentaDetalleDTO {
  @ApiProperty({ description: 'Cantidad del producto' })
  @IsInt()
  cantidad: number;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'ID del producto' })
  @IsInt()
  @IsOptional()
  productoId: number;
}
