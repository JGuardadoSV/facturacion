import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'demo@gmail.com', description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Juan Perez',
    description: 'Nombre completo del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  nombreCompleto?: string;

  @ApiProperty({
    example: 'Perez',
    description: 'Apellidos del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Clave del usuario',
    required: false,
  })
  @IsOptional()
  @IsString()
  clave?: string;

  @ApiProperty({
    example: 'ADMIN',
    description:
      'Rol del usuario. Los valores posibles son: SUPERADMIN, ADMIN, USER',
    required: false,
    enum: Role,
  })
  @IsOptional()
  rol?: Role;

  @ApiProperty({ example: 1, description: 'ID de la empresa', required: false })
  @IsOptional()
  @IsInt()
  empresaId?: number;
}
