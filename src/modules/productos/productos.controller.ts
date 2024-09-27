import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('productos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.createProducto({
      nombre: createProductoDto.nombre,
      precio: createProductoDto.precio,
      existencias: createProductoDto.existencias,
      empresa: {
        connect: {
          idEmpresa: createProductoDto.empresaId,
        },
      },
    });
  }

  @Get(':empresaId')
  @ApiOperation({ summary: 'Obtiene todos los Productos' })
  @ApiResponse({ status: 200, description: 'Productos encontrados.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  findAll(@Param('empresaId') empresaId: string) {
    const id = parseInt(empresaId, 10);
    return this.productosService.productos(id, {});
  }

  @Get(':id/:empresaId')
  @ApiOperation({ summary: 'Obtiene un solo Producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  findOne(@Param('id') id: string, @Param('empresaId') empresaId: string) {
    const idempresa = parseInt(empresaId, 10);
    return this.productosService.producto(Number(id), idempresa);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza un solo Producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.updateProducto({
      where: { id: Number(id) },
      data: updateProductoDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un solo Producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  remove(@Param('id') id: string) {
    return this.productosService.deleteProducto({ id: Number(id) });
  }
}
