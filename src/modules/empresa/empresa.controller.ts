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
import { Prisma, Empresa } from '@prisma/client';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('empresa')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @ApiOperation({ summary: 'Crear una nueva empresa' })
  @ApiResponse({ status: 201, description: 'Empresa registrada con éxito.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.createEmpresa(createEmpresaDto);
  }

  @ApiOperation({ summary: 'Obtener todas las empresas' })
  @ApiResponse({ status: 201, description: 'Empresas encontradas.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @Get()
  findAll() {
    return this.empresaService.empresas({});
  }

  @ApiOperation({ summary: 'Obtener una empresa por ID' })
  @ApiResponse({ status: 201, description: 'Empresa encontrada.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.empresa({ idEmpresa: Number(id) });
  }

  @ApiOperation({ summary: 'Actualizar una empresa por ID' })
  @ApiResponse({ status: 201, description: 'Empresa actualizada.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.updateEmpresa({
      where: { idEmpresa: Number(id) },
      data: updateEmpresaDto,
    });
  }

  @ApiOperation({ summary: 'Eliminar una empresa por ID' })
  @ApiResponse({ status: 201, description: 'Empresa eliminada.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.deleteEmpresa({ idEmpresa: Number(id) });
  }
}
