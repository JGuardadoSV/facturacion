import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  nombreCompleto?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsString()
  clave?: string;

  @IsOptional()
  rol?: Role;

  @IsOptional()
  @IsInt()
  empresaId?: string;
}