import { Module } from '@nestjs/common';
import { UsuariosService } from '../../servicios/usuarios/usuarios.service';
import { UsuariosController } from '../../controladores/usuarios/usuarios.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}