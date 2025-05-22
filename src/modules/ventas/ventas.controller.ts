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
import { Transform } from 'class-transformer';

@ApiTags('Ventas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Entrada inválida' })
  async create(@Body() ventaDTO: VentaDTO) {
    // Transformar la fecha si viene como string
    if (typeof ventaDTO.fecha === 'string') {
      ventaDTO.fecha = new Date(ventaDTO.fecha);
    }
    return this.ventasService.create(ventaDTO);
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
