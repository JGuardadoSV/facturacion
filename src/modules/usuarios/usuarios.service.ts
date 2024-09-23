import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Usuario, Prisma } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async usuario(
    usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
      include: {
        empresa: true,
      },
    });
  }

  async usuarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsuarioWhereUniqueInput;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput;
  }): Promise<Usuario[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.usuario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        empresa: true,
      },
    });
  }

  async createUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  async updateUsuario(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: Prisma.UsuarioUpdateInput;
  }): Promise<Usuario> {
    const { where, data } = params;
    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  

  async deleteUsuario(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}