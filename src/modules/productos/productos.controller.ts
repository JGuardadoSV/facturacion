import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Prisma, Producto } from '@prisma/client';
import { CreateProductoDto } from './dto/producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Post()
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
  findAll(@Param('empresaId') empresaId: string) {
    const id = parseInt(empresaId, 10);
    return this.productosService.productos(id, {});
  }

  @Get(':id/:empresaId')
  findOne(@Param('id') id: string, @Param('empresaId') empresaId: string) {
    const idempresa = parseInt(empresaId, 10);
    return this.productosService.producto(Number(id), idempresa);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    return this.productosService.deleteProducto({ id: Number(id) });
  }
}
