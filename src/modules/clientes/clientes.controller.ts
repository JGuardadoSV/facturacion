import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientesService } from './clientes.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'El cliente ha sido creado.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  create(@Body() createUsuarioDto: CreateClienteDto) {
    return this.clienteService.createCliente(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.' })
  findAll() {
    return this.clienteService.clientes({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del cliente.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.clienteService.cliente({ idCliente: Number(id) });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'El cliente ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateCliente({
      where: { idCliente: Number(id) },
      data: updateClienteDto,
    });
  }

  @Patch('asignar-empresa/:id')
  @ApiOperation({ summary: 'Asignar una empresa a un cliente' })
  @ApiResponse({
    status: 200,
    description: 'La empresa ha sido asignada al cliente.',
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  asignarEmpresa(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clienteService.updateCliente({
      where: { idCliente: Number(id) },
      data: updateClienteDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiResponse({ status: 200, description: 'El cliente ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
  remove(@Param('id') id: string) {
    return this.clienteService.deleteCliente({ idCliente: Number(id) });
  }
}
