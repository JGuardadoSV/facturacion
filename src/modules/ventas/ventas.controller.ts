import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { Prisma, Producto, Venta } from '@prisma/client';
import { CreateVentaDTO } from './dto/venta.dto';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  create(@Body() createVentasDto: CreateVentaDTO) {
    return this.ventasService.createVenta({
      tipoVenta: createVentasDto.tipoVenta,
      total: createVentasDto.total,
      detalles: {
        create: createVentasDto.detalles.map((detalle) => ({
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
          idEmpresa: createVentasDto.empresaId,
        },
      },
      Cliente: {
        connect: {
          idCliente: createVentasDto.clienteId,
        },
      },
    });
  }

  @Get(':id/:idempresa')
  findAll(@Param('id') id: string, @Param('idempresa') idempresa: string) {
    const idventa = parseInt(id);
    const idempresaventa = parseInt(idempresa);
    return this.ventasService.venta(idventa, idempresaventa);
  }

  @Get(':empresaId/:fechaInicio/:fechaFin')
  async getVentas(
    @Param('empresaId') empresaId: string,
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFin') fechaFin: string,
  ): Promise<Venta[]> {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return this.ventasService.ventas(Number(empresaId), inicio, fin);
  }
}
