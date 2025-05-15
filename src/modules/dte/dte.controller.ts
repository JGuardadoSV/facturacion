import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DteService } from './dte.service';
import { DteMhDto } from './dto/dte-mh.dto';

@Controller('dte')
export class DteController {
  constructor(private readonly dteService: DteService) {}

  @Get(':id')
  async generarDte(@Param('id', ParseIntPipe) id: number): Promise<DteMhDto> {
    return this.dteService.generarDte(id);
  }
}
