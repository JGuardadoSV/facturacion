import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      include: {
        empresa: true,
      },
    });
    if (user && (await bcrypt.compare(password, user.clave))) {
      const { clave, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('Usuario en login:', user);
    const payload = {
      email: user.email,
      sub: user.id,
      rol: user.rol,
      empresaid: user.empresaid,
    };
    console.log('Payload para token:', payload);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nombrecompleto: user.nombrecompleto,
        apellidos: user.apellidos,
        rol: user.rol,
        empresaid: user.empresaid,
        empresa: user.empresa,
        activo: user.activo,
        fotografia: user.fotografia,
      },
    };
  }

  async logout(userId: number) {
    // Aquí podrías invalidar el token si lo estás almacenando en una lista negra
    // Por ahora, simplemente retornamos un mensaje de éxito
    return { message: 'Logout exitoso' };
  }
}
