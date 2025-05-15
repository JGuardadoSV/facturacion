import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'FERRECONSTRUC, S.A. DE C.V.',
  })
  @IsString()
  @IsNotEmpty()
  nombreempresa: string;

  @ApiProperty({
    description: 'Dirección de la empresa',
    example:
      'CARRETERA TRONCAL DEL NORTE KM. 48 1/2, EL COYOLITO, TEJUTLA, CHALATENANGO',
  })
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiPropertyOptional({
    description: 'Email corporativo de la empresa',
    example: 'ferreconstruc21@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  emailcorporativo: string;

  @ApiPropertyOptional({
    description: 'Teléfono de la empresa',
    example: '2309-3642',
  })
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiPropertyOptional({
    description: 'Registro de IVA de la empresa',
    example: 'IVA-123456',
  })
  @IsOptional()
  @IsString()
  iva: string;

  @ApiProperty({
    description: 'NIT de la empresa',
    example: '04352208241018',
  })
  @IsString()
  @IsNotEmpty()
  nit: string;

  @ApiProperty({
    description: 'Número de Registro de Contribuyente',
    example: '3477200',
  })
  @IsString()
  @IsNotEmpty()
  nrc: string;

  @ApiProperty({
    description: 'Código de actividad económica',
    example: '46510',
  })
  @IsString()
  @IsNotEmpty()
  codActividad: string;

  @ApiProperty({
    description: 'Descripción de actividad económica',
    example: 'VENTA AL POR MAYOR DE ARTICULOS DE FERRETERIA Y PINTURERIAS',
  })
  @IsString()
  @IsNotEmpty()
  descActividad: string;

  @ApiProperty({
    description: 'Nombre comercial de la empresa',
    example: 'FERRECONSTRUC, S.A. DE C.V.',
  })
  @IsOptional()
  @IsString()
  nombreComercial: string;

  @ApiProperty({
    description: 'Tipo de establecimiento (01: Sucursal, 02: Matriz)',
    example: '02',
  })
  @IsString()
  @IsNotEmpty()
  tipoEstablecimiento: string;

  @ApiProperty({
    description: 'Código del departamento',
    example: '04',
  })
  @IsString()
  @IsNotEmpty()
  departamento: string;

  @ApiProperty({
    description: 'Código del municipio',
    example: '35',
  })
  @IsString()
  @IsNotEmpty()
  municipio: string;

  @ApiProperty({
    description: 'Complemento de dirección',
    example:
      'CARRETERA TRONCAL DEL NORTE KM. 48 1/2, EL COYOLITO, TEJUTLA, CHALATENANGO',
  })
  @IsString()
  @IsNotEmpty()
  complemento: string;

  @ApiProperty({
    description: 'Código de establecimiento',
    example: 'F001',
  })
  @IsString()
  @IsNotEmpty()
  codEstable: string;

  @ApiProperty({
    description: 'Código de punto de venta',
    example: 'C001',
  })
  @IsString()
  @IsNotEmpty()
  codPuntoVenta: string;
}
