import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma, Empresa } from '@prisma/client';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.createEmpresa(createEmpresaDto);
  }

  @Get()
  findAll() {
    return this.empresaService.empresas({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.empresa({ idEmpresa: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.updateEmpresa({
        where: { idEmpresa: Number(id) },
        data: updateEmpresaDto,
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.deleteEmpresa({ idEmpresa: Number(id) });
  }
}
