import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { empresa as Empresa, Prisma } from '@prisma/client';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  async empresa(
    empresaWhereUniqueInput: Prisma.empresaWhereUniqueInput,
  ): Promise<Empresa | null> {
    return this.prisma.empresa.findUnique({
      where: empresaWhereUniqueInput,
      include: {
        usuarios: true,
      },
    });
  }

  async empresas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.empresaWhereUniqueInput;
    where?: Prisma.empresaWhereInput;
    orderBy?: Prisma.empresaOrderByWithRelationInput;
  }): Promise<Empresa[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.empresa.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        usuarios: true,
      },
    });
  }

  async createEmpresa(data: Prisma.empresaCreateInput): Promise<Empresa> {
    return this.prisma.empresa.create({
      data,
    });
  }

  async updateEmpresa(params: {
    where: Prisma.empresaWhereUniqueInput;
    data: Prisma.empresaUpdateInput;
  }): Promise<Empresa> {
    const { where, data } = params;
    return this.prisma.empresa.update({
      data,
      where,
    });
  }

  async deleteEmpresa(where: Prisma.empresaWhereUniqueInput): Promise<Empresa> {
    return this.prisma.empresa.delete({
      where,
    });
  }
}
