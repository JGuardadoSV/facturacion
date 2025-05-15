import { registerAs } from '@nestjs/config';

export default registerAs('test', () => ({
  database: {
    url:
      process.env.TEST_DATABASE_URL ||
      'mysql://root:@localhost:3306/facturacion_test',
  },
  jwt: {
    secret: 'test_secret',
    expiresIn: '1h',
  },
}));
