import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { UsuariosService } from './servicios/usuarios/usuarios.service';
import { UsuariosController } from './controladores/usuarios/usuarios.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuariosModule,PrismaModule],
  controllers: [AppController, UsuariosController],
  providers: [AppService, UsuariosService],
})
export class AppModule {}
