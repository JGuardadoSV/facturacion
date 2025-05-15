import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { registerAs } from '@nestjs/config';

export default () => ({
  throttle: {
    ttl: 60, // 1 minuto
    limit: 10, // 10 peticiones por minuto
  },
});
