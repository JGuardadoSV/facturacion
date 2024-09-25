import { Empresa } from '@prisma/client';
import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsInt()
  existencias: number;

  @IsInt()
  empresaId: number;
}
