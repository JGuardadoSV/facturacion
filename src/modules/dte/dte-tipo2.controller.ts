import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DteTipo2Service } from './dte-tipo2.service';
import { DteTipo2Dto } from './dto/dte-tipo2.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('DTE Tipo 2')
@Controller('dte-tipo2')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DteTipo2Controller {
  constructor(private readonly dteTipo2Service: DteTipo2Service) {}

  @Get(':ventaId')
  @ApiOperation({ summary: 'Generar DTE tipo 2 para una venta' })
  @ApiResponse({
    status: 200,
    description: 'DTE tipo 2 generado exitosamente',
    type: DteTipo2Dto,
  })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  @ApiResponse({
    status: 403,
    description: 'No tiene permiso para acceder a esta venta',
  })
  async generarDteTipo2(
    @Param('ventaId') ventaId: number,
    @GetUser('empresaid') empresaid: number,
  ): Promise<DteTipo2Dto> {
    return this.dteTipo2Service.generarDteTipo2(ventaId, empresaid);
  }
}
