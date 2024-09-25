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
import { VentasModule } from './modules/ventas/ventas.module';
import { VentasController } from './modules/ventas/ventas.controller';
import { VentasService } from './modules/ventas/ventas.service';
import { ComprasModule } from './modules/compras/compras.module';
import { ComprasController } from './modules/compras/compras.controller';
import { ComprasService } from './modules/compras/compras.service';

@Module({
  imports: [
    UsuariosModule,
    PrismaModule,
    EmpresaModule,
    ClientesModule,
    ProveedorModule,
    ProductosModule,
    VentasModule,
    ComprasModule,
  ],
  controllers: [
    AppController,
    UsuariosController,
    EmpresaController,
    ProveedorController,
    ProductosController,
    VentasController,
    ComprasController,
  ],
  providers: [
    AppService,
    UsuariosService,
    EmpresaService,
    ClientesService,
    ProveedoresService,
    ProductosService,
    VentasService,
    ComprasService,
  ],
})
export class AppModule {}
