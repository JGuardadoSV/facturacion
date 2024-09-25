import { Venta } from '@prisma/client';
import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { VentasService } from './ventas.service';

@Module({
  imports: [PrismaModule],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
