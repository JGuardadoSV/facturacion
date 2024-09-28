import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmpresaDto {
  @ApiProperty({ description: 'Nombre de la empresa' })
  @IsString()
  nombreempresa: string;

  @ApiProperty({ description: 'Dirección de la empresa' })
  @IsString()
  direccion: string;

  @ApiPropertyOptional({ description: 'Email corporativo de la empresa' })
  @IsOptional()
  @IsEmail()
  emailcorporativo: string;

  @ApiPropertyOptional({ description: 'Teléfono de la empresa' })
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiPropertyOptional({ description: 'Registro de IVA de la empresa' })
  @IsOptional()
  @IsString()
  iva: string;

  @ApiPropertyOptional({ description: 'NIT de la empresa' })
  @IsOptional()
  @IsString()
  nit: string;
}
