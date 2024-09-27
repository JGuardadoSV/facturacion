import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { CreateVentaDTO } from './dto/venta.dto';
import { Venta } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Ventas')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'Sale created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createVentasDto: CreateVentaDTO) {
    return this.ventasService.createVenta({
      tipoVenta: createVentasDto.tipoVenta,
      total: createVentasDto.total,
      detalles: {
        create: createVentasDto.detalles.map((detalle) => ({
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
  @ApiOperation({ summary: 'Get sale by ID and company ID' })
  @ApiResponse({ status: 200, description: 'Sale retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  findAll(@Param('id') id: string, @Param('idempresa') idempresa: string) {
    const idventa = parseInt(id);
    const idempresaventa = parseInt(idempresa);
    return this.ventasService.venta(idventa, idempresaventa);
  }

  @Get(':empresaId/:fechaInicio/:fechaFin')
  @ApiOperation({ summary: 'Get sales by company ID and date range' })
  @ApiResponse({ status: 200, description: 'Sales retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
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
