import { Module } from '@nestjs/common';
import { DteController } from './dte.controller';
import { DteService } from './dte.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { DteTipo2Service } from './dte-tipo2.service';
import { DteTipo2Controller } from './dte-tipo2.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DteController, DteTipo2Controller],
  providers: [DteService, DteTipo2Service],
  exports: [DteService, DteTipo2Service],
})
export class DteModule {}
