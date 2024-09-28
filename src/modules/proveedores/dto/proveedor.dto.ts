import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { empresa } from '@prisma/client';

export class CreateProveedorDto {
  @ApiProperty({
    example: 'Juan Perez',
    description: 'Nombre del proveedor',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico del proveedor',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+50312345678',
    description: 'Teléfono del proveedor',
  })
  @IsString()
  telefono: string;

  @ApiProperty({
    example: 'Calle Falsa 123, San Salvador',
    description: 'Dirección del proveedor',
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    example: '12345678-9',
    description: 'Número de IVA del proveedor',
    required: false,
  })
  @IsOptional()
  @IsString()
  iva?: string;

  @ApiProperty({
    example: '0614-290190-102-3',
    description: 'Número de NIT del proveedor',
    required: false,
  })
  @IsOptional()
  @IsString()
  nit?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la empresa donde se va a registrar',
    required: false,
  })
  @IsOptional()
  @IsInt()
  empresaid?: number;
}
