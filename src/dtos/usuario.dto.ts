import { IsEmail, IsOptional, IsString } from 'class-validator';
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
  rol?: Role;
}