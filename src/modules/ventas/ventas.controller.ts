import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { VentaDTO } from './dto/venta.dto';
import { venta as Venta } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Ventas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  async create(
    @Body() createVentaDto: VentaDTO,
    @GetUser('empresaid') empresaid: number,
  ) {
    const venta = await this.ventasService.create(createVentaDto, empresaid);
    return {
      message: 'Venta creada exitosamente',
      venta: {
        id: venta.id,
        tipoventa: venta.tipoventa,
        total: venta.total,
        fecha: venta.fecha,
        detalles: venta.detalles.map((detalle) => ({
          id: detalle.id,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          productoid: detalle.productoid,
        })),
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ventas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ventas obtenida exitosamente',
  })
  async findAll(@GetUser('empresaid') empresaid: number) {
    return this.ventasService.findAll(empresaid);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  async findOne(
    @Param('id') id: number,
    @GetUser('empresaid') empresaid: number,
  ) {
    return this.ventasService.findOne(id, empresaid);
  }

  @Get(':id/:idempresa')
  @ApiOperation({ summary: 'Obtener venta por ID y empresa' })
  @ApiResponse({ status: 200, description: 'Venta obtenida exitosamente' })
  @ApiResponse({ status: 400, description: 'Entrada inválida' })
  async findVentaByEmpresa(
    @Param('id') id: string,
    @Param('idempresa') idempresa: string,
  ) {
    const idventa = parseInt(id);
    const idempresaventa = parseInt(idempresa);
    return this.ventasService.venta(idventa, idempresaventa);
  }

  @Get(':empresaId/:fechaInicio/:fechaFin')
  @ApiOperation({ summary: 'Obtener ventas por empresa y rango de fechas' })
  @ApiResponse({ status: 200, description: 'Ventas obtenidas exitosamente' })
  @ApiResponse({ status: 400, description: 'Entrada inválida' })
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
