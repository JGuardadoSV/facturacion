import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { proveedor as Proveedor, Prisma } from '@prisma/client';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

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

  async createProveedor(createProveedorDto: CreateProveedorDto) {
    // Primero verificamos que la empresa exista
    const empresa = await this.prisma.empresa.findUnique({
      where: { idempresa: createProveedorDto.empresaid },
    });

    if (!empresa) {
      throw new Error('La empresa especificada no existe');
    }

    const { empresaid, ...proveedorData } = createProveedorDto;

    return this.prisma.proveedor.create({
      data: {
        ...proveedorData,
        empresaid: empresaid, // Asignamos directamente el empresaid
      },
      include: {
        empresa: true,
      },
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

  async findAll(empresaid: number) {
    console.log('Buscando proveedores para empresaid:', empresaid);

    const proveedores = await this.prisma.proveedor.findMany({
      where: {
        empresaid: Number(empresaid),
      },
      include: {
        empresa: {
          select: {
            idempresa: true,
            nombreempresa: true,
            direccion: true,
            emailcorporativo: true,
            telefono: true,
            nit: true,
            nrc: true,
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    console.log('Proveedores encontrados:', proveedores);
    return proveedores;
  }

  async findOne(id: number) {
    return this.prisma.proveedor.findUnique({
      where: { id },
      include: {
        empresa: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.proveedor.delete({
      where: { id },
    });
  }
}
