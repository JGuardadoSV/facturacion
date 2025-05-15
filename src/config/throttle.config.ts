import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'throttle',
  (): ThrottlerModuleOptions => ({
    ttl: 60, // 1 minuto
    limit: 100, // 100 peticiones por minuto
  }),
);
