import { IsEmail, IsOptional, IsString } from 'class-validator';


export class CreateEmpresaDto {
  
  @IsString()
  nombreEmpresa: string;
  @IsString()
  direccion: string;

  @IsOptional() 
  @IsEmail()
  emailcorporativo: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  iva: string;

  @IsOptional()
  @IsString()
  nit: string;
}

