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

  @Get()
  findAll() {
    return this.proveedoresService.proveedores({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedoresService.proveedor({ id: Number(id) });
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedoresService.deleteProveedor({ id: Number(id) });
  }
}
