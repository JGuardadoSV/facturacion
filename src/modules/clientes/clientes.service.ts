// cliente.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { cliente as Cliente, Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  /*
   async cliente(
    clienteWhereUniqueInput: Prisma.clienteWhereUniqueInput,
  ): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: clienteWhereUniqueInput,
      include: {
        empresa: true,
      },
    });
  }*/
  async cliente(
    clienteWhereUniqueInput: Prisma.clienteWhereUniqueInput,
  ): Promise<Cliente | null> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: clienteWhereUniqueInput,
        include: {
          empresa: true,
        },
      });

      // Si no se encuentra el cliente, lanzamos una excepción NotFound
      if (!cliente) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Cliente no encontrado con los datos proporcionados.',
        });
      }

      return cliente;
    } catch (error) {
      // Manejo de errores específicos de Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Puedes manejar diferentes códigos de error de Prisma aquí
        if (error.code === 'P2025') {
          throw new NotFoundException({
            statusCode: 404,
            message: 'Cliente no encontrado con los datos proporcionados.',
          });
        }
      }

      // Si no es un error conocido, lanzamos una excepción genérica
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el cliente.',
      );
    }
  }

  async clientes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.clienteWhereUniqueInput;
    where?: Prisma.clienteWhereInput;
    orderBy?: Prisma.clienteOrderByWithRelationInput;
  }): Promise<Cliente[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cliente.findMany({
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

  async createCliente(data: Prisma.clienteCreateInput): Promise<Cliente> {
    return this.prisma.cliente.create({ data });
  }

  async updateCliente(params: {
    where: Prisma.clienteWhereUniqueInput;
    data: Prisma.clienteUpdateInput;
  }): Promise<Cliente> {
    const { where, data } = params;
    return this.prisma.cliente.update({
      data,
      where,
    });
  }

  async deleteCliente(where: Prisma.clienteWhereUniqueInput): Promise<Cliente> {
    return this.prisma.cliente.delete({
      where,
    });
  }
} //FIN
