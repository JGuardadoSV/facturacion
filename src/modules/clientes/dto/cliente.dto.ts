import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString()
  nombre: string;

  @ApiPropertyOptional({ description: 'Teléfono del cliente' })
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({ description: 'Dirección del cliente' })
  @IsOptional()
  direccion?: string;

  @ApiProperty({ description: 'Email del cliente' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'ID de la empresa asociada' })
  @IsOptional()
  @IsInt()
  empresaId?: number;
}
