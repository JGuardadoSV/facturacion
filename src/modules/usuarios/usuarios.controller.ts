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
import { UsuariosService } from '../../modules/usuarios/usuarios.service';
import { Prisma, Usuario } from '@prisma/client';
import { CreateUsuarioDto } from 'src/modules/usuarios/dto/usuario.dto';
import { UpdateUsuarioDto } from 'src/modules/usuarios/dto/update-usuario.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('usuarios')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
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
  @ApiOperation({ summary: 'Listado de usuarios' })
  @ApiResponse({ status: 201, description: 'Listado de usuarios obtenido' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findAll() {
    return this.usuariosService.usuarios({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario obtenido' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.usuario({ id: Number(id) });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario actualizado' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateUsuario({
      where: { id: Number(id) },
      data: updateUsuarioDto,
    });
  }

  @Patch('asignar-empresa/:id')
  @ApiOperation({ summary: 'Asignar empresa a un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario actualizado' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 201, description: 'Usuario eliminado' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id') id: string) {
    return this.usuariosService.deleteUsuario({ id: Number(id) });
  }
}
