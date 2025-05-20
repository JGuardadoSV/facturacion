import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { ProveedoresService } from './proveedores.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('proveedores')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('proveedores')
export class ProveedoresController {
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
  findAll(@Request() req) {
    const empresaid = req.user.user?.empresaid;
    if (!empresaid) {
      throw new Error('No se encontró la empresa asociada al usuario');
    }
    return this.proveedoresService.findAll(empresaid);
  }

  @ApiOperation({ summary: 'Obtener proveedor por ID' })
  @ApiResponse({ status: 201, description: 'Listado de proveedor obtenido ' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.findOne(+id);
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
    return this.proveedoresService.remove(+id);
  }
}
