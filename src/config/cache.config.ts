import { CacheModuleOptions } from '@nestjs/cache-manager';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'cache',
  (): CacheModuleOptions => ({
    ttl: 60 * 60 * 1000, // 1 hora
    max: 100, // máximo 100 items en caché
  }),
);
