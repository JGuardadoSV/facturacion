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
import { ClientesModule } from './modules/clientes/clientes.module';
import { ClientesService } from './modules/clientes/clientes.service';
import { ProveedorModule } from './modules/proveedores/proveedores.module';
import { ProveedorController } from './modules/proveedores/proveedores.controller';
import { ProveedoresService } from './modules/proveedores/proveedores.service';
import { ProductosModule } from './modules/productos/productos.module';
import { ProductosController } from './modules/productos/productos.controller';
import { ProductosService } from './modules/productos/productos.service';

@Module({
  imports: [
    UsuariosModule,
    PrismaModule,
    EmpresaModule,
    ClientesModule,
    ProveedorModule,
    ProductosModule,
  ],
  controllers: [
    AppController,
    UsuariosController,
    EmpresaController,
    ProveedorController,
    ProductosController,
  ],
  providers: [
    AppService,
    UsuariosService,
    EmpresaService,
    ClientesService,
    ProveedoresService,
    ProductosService,
  ],
})
export class AppModule {}
