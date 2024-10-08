import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { usuario as Usuario, Prisma } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // Método para obtener un usuario único basado en un identificador único
  async usuario(
    usuarioWhereUniqueInput: Prisma.usuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
      include: {
        empresa: true, // Incluye la relación con la entidad 'empresa'
      },
    });
  }

  /* Método alternativo comentado para obtener un usuario único
  async findUnique(where: Prisma.usuarioWhereUniqueInput): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({
      where,
      include: { empresa: true },
    });
  }*/

  // Método para obtener múltiples usuarios con opciones de paginación y filtrado
  async usuarios(params: {
    skip?: number; // Número de registros a omitir
    take?: number; // Número de registros a tomar
    cursor?: Prisma.usuarioWhereUniqueInput; // Cursor para paginación
    where?: Prisma.usuarioWhereInput; // Condiciones de filtrado
    orderBy?: Prisma.usuarioOrderByWithRelationInput; // Ordenación de los resultados
  }): Promise<Usuario[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.usuario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        empresa: true, // Incluye la relación con la entidad 'empresa'
      },
    });
  }

  // Método para crear un nuevo usuario
  async createUsuario(data: Prisma.usuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  // Método para actualizar un usuario existente
  async updateUsuario(params: {
    where: Prisma.usuarioWhereUniqueInput; // Identificador único del usuario a actualizar
    data: Prisma.usuarioUpdateInput; // Datos a actualizar
  }): Promise<Usuario> {
    const { where, data } = params;
    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  // Método para eliminar un usuario
  async deleteUsuario(where: Prisma.usuarioWhereUniqueInput): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}
