import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from '../../modules/usuarios/usuarios.service';
import { Prisma, Usuario } from '@prisma/client';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/modules/usuarios/dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.usuarios({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.usuario({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateUsuario({
        where: { id: Number(id) },
        data: updateUsuarioDto,
      });
  }

  @Patch('asignar-empresa/:id')
  asignarEmpresa(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateUsuario({
        where: { id: Number(id) },
        data: updateUsuarioDto,
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario({ id: Number(id) });
  }
}
