import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Producto, Prisma } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async producto(idproducto: number, empresaId: number): Promise<Producto[]> {
    return this.prisma.producto.findMany({
      where: {
        empresaId: empresaId,
        id: idproducto,
      },
      include: {
        //empresa: true,
      },
    });
  }

  async productos(
    empresaId: number,
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProductoWhereUniqueInput;
      where?: Prisma.ProductoWhereInput;
      orderBy?: Prisma.ProductoOrderByWithRelationInput;
    },
  ): Promise<Producto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.producto.findMany({
      skip,
      take,
      cursor,
      orderBy,
      where: {
        empresaId: empresaId,
      },
      include: {
        // empresa: true,
      },
    });
  }

  async createProducto(data: Prisma.ProductoCreateInput): Promise<Producto> {
    return this.prisma.producto.create({
      data,
    });
  }

  async updateProducto(params: {
    where: Prisma.ProductoWhereUniqueInput;
    data: Prisma.ProductoUpdateInput;
  }): Promise<Producto> {
    const { where, data } = params;
    return this.prisma.producto.update({
      data,
      where,
    });
  }

  async deleteProducto(
    where: Prisma.ProductoWhereUniqueInput,
  ): Promise<Producto> {
    return this.prisma.producto.delete({
      where,
    });
  }
}
