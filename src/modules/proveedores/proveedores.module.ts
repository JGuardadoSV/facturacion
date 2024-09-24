import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedorController } from './proveedores.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProveedorController],
  providers: [ProveedoresService],
})
export class ProveedorModule {}
