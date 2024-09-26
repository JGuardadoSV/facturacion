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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('compras')
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva compra' })
  @ApiResponse({ status: 201, description: 'La compra se ha registrado.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() CreateCompraDTO: CreateCompraDTO) {
    return this.comprasService.createCompra({
      total: CreateCompraDTO.total,
      iva: CreateCompraDTO.iva,
      numeroFactura: CreateCompraDTO.numeroFactura,
      detalles: {
        create: CreateCompraDTO.detalles.map((detalle) => ({
          producto: {
            connect: {
              id: detalle.productoId,
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
  @ApiOperation({ summary: 'Obtener una compra por ID y empresa' })
  @ApiResponse({ status: 201, description: 'Compra obtenida.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  findAll(@Param('id') id: string, @Param('idempresa') idempresa: string) {
    const idcompra = parseInt(id);
    const idempresacompra = parseInt(idempresa);
    return this.comprasService.compra(idcompra, idempresacompra);
  }

  @Get(':empresaId/:fechaInicio/:fechaFin')
  @ApiOperation({ summary: 'Obtener compras por empresa y rango de fechas' })
  @ApiResponse({ status: 201, description: 'Compras obtenidas.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async getCompras(
    @Param('empresaId') empresaId: string,
    @Param('fechaInicio') fechaInicio: Date,
    @Param('fechaFin') fechaFin: Date,
  ): Promise<Compra[]> {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    return this.comprasService.compras(Number(empresaId), inicio, fin);
  }
}
