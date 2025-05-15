import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API de Facturación')
  .setDescription('API para el sistema de facturación electrónica')
  .setVersion('1.0')
  .addTag('auth', 'Endpoints de autenticación')
  .addTag('empresa', 'Gestión de empresas')
  .addTag('dte', 'Documentos Tributarios Electrónicos')
  .addTag('clientes', 'Gestión de clientes')
  .addTag('productos', 'Gestión de productos')
  .addTag('proveedores', 'Gestión de proveedores')
  .addTag('compras', 'Gestión de compras')
  .addTag('ventas', 'Gestión de ventas')
  .addBearerAuth()
  .build();
