import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsOptional()
  telefono?: string;

  @IsOptional()
  direccion?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  empresaId?: string;
}
