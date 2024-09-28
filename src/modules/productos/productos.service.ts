import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { producto as Producto, Prisma } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async producto(idproducto: number, empresaId: number): Promise<Producto[]> {
    return this.prisma.producto.findMany({
      where: {
        empresaid: empresaId,
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
      cursor?: Prisma.productoWhereUniqueInput;
      where?: Prisma.productoWhereInput;
      orderBy?: Prisma.productoOrderByWithRelationInput;
    },
  ): Promise<Producto[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.producto.findMany({
      skip,
      take,
      cursor,
      orderBy,
      where: {
        empresaid: empresaId,
      },
      include: {
        // empresa: true,
      },
    });
  }

  async createProducto(data: Prisma.productoCreateInput): Promise<Producto> {
    return this.prisma.producto.create({
      data,
    });
  }

  async updateProducto(params: {
    where: Prisma.productoWhereUniqueInput;
    data: Prisma.productoUpdateInput;
  }): Promise<Producto> {
    const { where, data } = params;
    return this.prisma.producto.update({
      data,
      where,
    });
  }

  async deleteProducto(
    where: Prisma.productoWhereUniqueInput,
  ): Promise<Producto> {
    return this.prisma.producto.delete({
      where,
    });
  }
}
