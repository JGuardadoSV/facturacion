// cliente.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { cliente as Cliente, Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async cliente(
    clienteWhereUniqueInput: Prisma.clienteWhereUniqueInput,
  ): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: clienteWhereUniqueInput,
      include: {
        empresa: true,
      },
    });
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
