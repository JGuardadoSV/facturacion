import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComprasService } from './compras.service';
import { Prisma, Producto, Compra } from '@prisma/client';
import { CreateCompraDTO } from './dto/compra.dto';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  create(@Body() CreateCompraDTO: CreateCompraDTO) {
    return this.comprasService.createCompra({
      total: CreateCompraDTO.total,
      iva: CreateCompraDTO.iva,
      numeroFactura: CreateCompraDTO.numeroFactura,
      detalles: {
        create: CreateCompraDTO.detalles.map((detalle) => ({
          producto: {
            connect: {
              id: detalle.productoId, // Cambiado a "id"
            },
          },
          cantidad: detalle.cantidad,
          precio: detalle.precio,
        })),
      },
      Empresa: {
        connect: {
          idEmpresa: CreateCompraDTO.empresaId,
        },
      },
      Proveedor: {
        connect: {
          id: CreateCompraDTO.proveedorId,
        },
      },
    });
  }

  @Get(':id/:idempresa')
  findAll(@Param('id') id: string, @Param('idempresa') idempresa: string) {
    const idcompra = parseInt(id);
    const idempresacompra = parseInt(idempresa);
    return this.comprasService.compra(idcompra, idempresacompra);
  }

  @Get(':empresaId/:fechaInicio/:fechaFin')
  async getCompras(
    @Param('empresaId') empresaId: string,
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFin') fechaFin: string,
  ): Promise<Compra[]> {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return this.comprasService.compras(Number(empresaId), inicio, fin);
  }
}
