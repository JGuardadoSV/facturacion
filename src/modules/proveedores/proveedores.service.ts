import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Proveedor, Prisma } from '@prisma/client';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  async proveedor(
    proveedorWhereUniqueInput: Prisma.ProveedorWhereUniqueInput,
  ): Promise<Proveedor | null> {
    return this.prisma.proveedor.findUnique({
      where: proveedorWhereUniqueInput,
      include: {
        Empresa: true,
      },
    });
  }

  async proveedores(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProveedorWhereUniqueInput;
    where?: Prisma.ProveedorWhereInput;
    orderBy?: Prisma.ProveedorOrderByWithRelationInput;
  }): Promise<Proveedor[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.proveedor.findMany({
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

  async createProveedor(data: Prisma.ProveedorCreateInput): Promise<Proveedor> {
    return this.prisma.proveedor.create({
      data,
    });
  }

  async updateProveedor(params: {
    where: Prisma.ProveedorWhereUniqueInput;
    data: Prisma.ProveedorUpdateInput;
  }): Promise<Proveedor> {
    const { where, data } = params;
    return this.prisma.proveedor.update({
      data,
      where,
    });
  }

  async deleteProveedor(
    where: Prisma.ProveedorWhereUniqueInput,
  ): Promise<Proveedor> {
    return this.prisma.proveedor.delete({
      where,
    });
  }
}
