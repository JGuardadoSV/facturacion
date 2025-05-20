import { IsString, IsOptional, IsInt, IsEmail } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  nombreComercial?: string;

  @IsString()
  nit: string;

  @IsString()
  @IsOptional()
  nrc?: string;

  @IsString()
  @IsOptional()
  codActividad?: string;

  @IsString()
  @IsOptional()
  descActividad?: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  emailcorporativo?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsString()
  @IsOptional()
  tipoProveedor?: string;

  @IsString()
  @IsOptional()
  departamento?: string;

  @IsString()
  @IsOptional()
  municipio?: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsOptional()
  tipoEstablecimiento?: string;

  @IsString()
  @IsOptional()
  codEstable?: string;

  @IsString()
  @IsOptional()
  codPuntoVenta?: string;

  @IsString()
  @IsOptional()
  iva?: string;

  @IsInt()
  empresaid: number;
}
