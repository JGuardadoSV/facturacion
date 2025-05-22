import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { ProductosModule } from './modules/productos/productos.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { VentasModule } from './modules/ventas/ventas.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsuariosModule,
    EmpresaModule,
    ProductosModule,
    ClientesModule,
    ProveedoresModule,
    VentasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
