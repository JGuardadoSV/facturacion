import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { Empresa } from '@prisma/client';
export class CreateProveedorDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  iva?: string;

  @IsOptional()
  @IsString()
  nit?: string;

  @IsOptional()
  @IsInt()
  empresaId?: string;
}
