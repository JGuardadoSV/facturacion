import { Module } from '@nestjs/common';
import { ComprasController } from './compras.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { ComprasService } from './compras.service';

@Module({
  imports: [PrismaModule],
  controllers: [ComprasController],
  providers: [ComprasService],
})
export class ComprasModule {}
