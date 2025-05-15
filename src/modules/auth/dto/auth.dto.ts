import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@empresa.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Contraseña123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Token JWT para autenticación',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Datos del usuario autenticado',
    example: {
      id: 1,
      email: 'usuario@empresa.com',
      nombrecompleto: 'Juan',
      apellidos: 'Pérez',
      rol: 'admin',
      empresaid: 1,
      empresa: {
        idempresa: 1,
        nombreempresa: 'FERRECONSTRUC, S.A. DE C.V.',
        nit: '04352208241018',
        nrc: '3477200',
      },
      activo: true,
      fotografia: 'url_foto.jpg',
    },
  })
  user: {
    id: number;
    email: string;
    nombrecompleto: string;
    apellidos: string;
    rol: string;
    empresaid: number;
    empresa: {
      idempresa: number;
      nombreempresa: string;
      nit: string;
      nrc: string;
    };
    activo: boolean;
    fotografia: string;
  };
}
