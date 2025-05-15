import { Module } from '@nestjs/common';
import { DteController } from './dte.controller';
import { DteService } from './dte.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DteController],
  providers: [DteService],
  exports: [DteService],
})
export class DteModule {}
