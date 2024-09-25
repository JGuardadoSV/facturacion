import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from '../../modules/usuarios/usuarios.service';
import { Prisma, Usuario } from '@prisma/client';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/modules/usuarios/dto/update-usuario.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({
    status: 201,
    description: 'El usuario se creo correctamente.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
  asignarEmpresa(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
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
