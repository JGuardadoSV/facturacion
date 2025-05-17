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

  @ApiPropertyOptional({
    description:
      'Tipo de documento (37 para consumidor final, otros para contribuyentes)',
  })
  @IsOptional()
  @IsString()
  tipoDocumento?: string;

  @ApiPropertyOptional({ description: 'Número de documento (NIT o DUI)' })
  @IsOptional()
  @IsString()
  numDocumento?: string;

  @ApiPropertyOptional({ description: 'Número de registro de contribuyente' })
  @IsOptional()
  @IsString()
  nrc?: string;

  @ApiPropertyOptional({ description: 'Código de actividad' })
  @IsOptional()
  @IsString()
  codActividad?: string;

  @ApiPropertyOptional({ description: 'Descripción de actividad' })
  @IsOptional()
  @IsString()
  descActividad?: string;

  @ApiPropertyOptional({ description: 'Departamento' })
  @IsOptional()
  @IsString()
  departamento?: string;

  @ApiPropertyOptional({ description: 'Municipio' })
  @IsOptional()
  @IsString()
  municipio?: string;

  @ApiPropertyOptional({ description: 'ID de la empresa asociada' })
  @IsOptional()
  @IsInt()
  empresaid?: number;
}
