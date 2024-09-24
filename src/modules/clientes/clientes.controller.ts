// cliente.controller.ts
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

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateClienteDto) {
    return this.clienteService.createCliente(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.clienteService.clientes({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.cliente({ idCliente: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.updateCliente({
      where: { idCliente: Number(id) },
      data: updateClienteDto,
    });
  }

  @Patch('asignar-empresa/:id')
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
  remove(@Param('id') id: string) {
    return this.clienteService.deleteCliente({ idCliente: Number(id) });
  }
}
