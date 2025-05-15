import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
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
import { AuthModule } from './modules/auth/auth.module';
import cacheConfig from './config/cache.config';
import throttleConfig from './config/throttle.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [cacheConfig, throttleConfig],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('throttle.ttl'),
        limit: configService.get('throttle.limit'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('cache.ttl'),
        max: configService.get('cache.max'),
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    PrismaModule,
    EmpresaModule,
    ClientesModule,
    ProveedorModule,
    ProductosModule,
    VentasModule,
    ComprasModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
