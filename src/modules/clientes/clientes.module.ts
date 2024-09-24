import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteController } from './clientes.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClienteController],
  providers: [ClientesService],
})
export class ClientesModule {}
