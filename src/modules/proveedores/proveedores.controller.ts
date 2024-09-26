import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProveedorDto } from './dto/proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedoresService } from './proveedores.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('proveedores')
@Controller('proveedores')
export class ProveedorController {
  constructor(private readonly proveedoresService: ProveedoresService) {}
  @ApiOperation({ summary: 'Registro de proveedor' })
  @ApiResponse({
    status: 201,
    description: 'El proveedor se creo correctamente.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedoresService.createProveedor(createProveedorDto);
  }

  @ApiOperation({ summary: 'Listar todos los proveedores' })
  @ApiResponse({
    status: 201,
    description: 'Listado de todos los proveedores obtenido',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get()
  findAll() {
    return this.proveedoresService.proveedores({});
  }

  @ApiOperation({ summary: 'Obtener proveedor por ID' })
  @ApiResponse({ status: 201, description: 'Listado de proveedor obtenido ' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.proveedor({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Actualizar proveedor' })
  @ApiResponse({
    status: 201,
    description: 'El proveedor se actualizo correctamente',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ) {
    return this.proveedoresService.updateProveedor({
      where: { id: Number(id) },
      data: updateProveedorDto,
    });
  }

  @ApiOperation({ summary: 'Asignar empresa a proveedor' })
  @ApiResponse({
    status: 201,
    description: 'El proveedor se actualizo correctamente',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch('asignar-empresa/:id')
  asignarEmpresa(
    @Param('id') id: string,
    @Body() updateProveedorDto: UpdateProveedorDto,
  ) {
    return this.proveedoresService.updateProveedor({
      where: { id: Number(id) },
      data: updateProveedorDto,
    });
  }

  @ApiOperation({ summary: 'Eliminar proveedor' })
  @ApiResponse({
    status: 201,
    description: 'El proveedor se elimino correctamente',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedoresService.deleteProveedor({ id: Number(id) });
  }
}
