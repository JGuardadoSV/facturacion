import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CompraDetalleDTO {
  @IsInt()
  cantidad: number;

  @IsNumber()
  precio: number;

  @IsInt()
  @IsOptional()
  productoId: number;
}
