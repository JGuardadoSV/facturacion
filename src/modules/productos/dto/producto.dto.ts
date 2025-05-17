import { empresa } from '@prisma/client';
import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'Cantidad de existencias' })
  @IsInt()
  existencias: number;

  @ApiProperty({ description: 'Código del producto', required: false })
  @IsOptional()
  @IsString()
  codigo?: string;

  @ApiProperty({ description: 'ID de la empresa' })
  @IsInt()
  empresaid: number;
}
