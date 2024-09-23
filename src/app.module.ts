import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { UsuariosService } from './modules/usuarios/usuarios.service';
import { UsuariosController } from './modules/usuarios/usuarios.controller';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { EmpresaController } from './modules/empresa/empresa.controller';
import { EmpresaService } from './modules/empresa/empresa.service';

@Module({
  imports: [UsuariosModule,PrismaModule,EmpresaModule],
  controllers: [AppController, UsuariosController,EmpresaController],
  providers: [AppService, UsuariosService,EmpresaService],
})
export class AppModule {}
