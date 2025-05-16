import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data) {
      // Convertimos el nombre del campo a minúsculas para asegurar consistencia
      const fieldName = data.toLowerCase();
      return user?.[fieldName];
    }
    return user;
  },
);
