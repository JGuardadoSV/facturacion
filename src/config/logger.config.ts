import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  level: process.env.LOG_LEVEL || 'info',
  format: process.env.LOG_FORMAT || 'json',
  timestamp: true,
  colorize: process.env.NODE_ENV !== 'production',
}));
