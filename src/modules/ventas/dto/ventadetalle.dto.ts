import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class VentaDetalleDTO {
  @IsInt()
  cantidad: number;

  @IsNumber()
  precio: number;

  @IsInt()
  @IsOptional()
  productoId: number;
}
