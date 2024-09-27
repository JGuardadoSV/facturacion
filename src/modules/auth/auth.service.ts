import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.clave))) {
      const { clave, ...result } = user;
      return result;
    }
    return null;
  }

  async login(usuario: any) {
    //agregar mas propiedades si es necesario
    const payload = { email: usuario.email, sub: usuario.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(userId: number) {
    // Aquí podrías invalidar el token si lo estás almacenando en una lista negra
    // Por ahora, simplemente retornamos un mensaje de éxito
    return { message: 'Logout exitoso' };
  }
}
