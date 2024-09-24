// cliente.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Cliente, Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async cliente(
    clienteWhereUniqueInput: Prisma.ClienteWhereUniqueInput,
  ): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: clienteWhereUniqueInput,
      include: {
        Empresa: true,
      },
    });
  }

  async clientes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClienteWhereUniqueInput;
    where?: Prisma.ClienteWhereInput;
    orderBy?: Prisma.ClienteOrderByWithRelationInput;
  }): Promise<Cliente[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cliente.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        Empresa: true,
      },
    });
  }

  async createCliente(data: Prisma.ClienteCreateInput): Promise<Cliente> {
    return this.prisma.cliente.create({
      data,
    });
  }

  async updateCliente(params: {
    where: Prisma.ClienteWhereUniqueInput;
    data: Prisma.ClienteUpdateInput;
  }): Promise<Cliente> {
    const { where, data } = params;
    return this.prisma.cliente.update({
      data,
      where,
    });
  }

  async deleteCliente(where: Prisma.ClienteWhereUniqueInput): Promise<Cliente> {
    return this.prisma.cliente.delete({
      where,
    });
  }
} //FIN
