import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { Prisma, Usuario } from '@prisma/client';
import { CreateUsuarioDto } from 'src/dtos/usuario.dto';
import { UpdateUsuarioDto } from 'src/dtos/update-usuario.dto';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario({ id: Number(id) });
  }
}
