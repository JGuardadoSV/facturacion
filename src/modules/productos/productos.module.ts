import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductosService } from './productos.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
