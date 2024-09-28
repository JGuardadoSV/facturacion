import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { proveedor as Proveedor, Prisma } from '@prisma/client';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  async proveedor(
    proveedorWhereUniqueInput: Prisma.proveedorWhereUniqueInput,
  ): Promise<Proveedor | null> {
    return this.prisma.proveedor.findUnique({
      where: proveedorWhereUniqueInput,
      include: {
        empresa: true,
      },
    });
  }

  async proveedores(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.proveedorWhereUniqueInput;
    where?: Prisma.proveedorWhereInput;
    orderBy?: Prisma.proveedorOrderByWithRelationInput;
  }): Promise<Proveedor[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.proveedor.findMany({
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

  async createProveedor(data: Prisma.proveedorCreateInput): Promise<Proveedor> {
    return this.prisma.proveedor.create({
      data,
    });
  }

  async updateProveedor(params: {
    where: Prisma.proveedorWhereUniqueInput;
    data: Prisma.proveedorUpdateInput;
  }): Promise<Proveedor> {
    const { where, data } = params;
    return this.prisma.proveedor.update({
      data,
      where,
    });
  }

  async deleteProveedor(
    where: Prisma.proveedorWhereUniqueInput,
  ): Promise<Proveedor> {
    return this.prisma.proveedor.delete({
      where,
    });
  }
}
