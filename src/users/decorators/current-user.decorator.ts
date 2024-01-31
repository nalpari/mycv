import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, contesxt: ExecutionContext) => {
    const request = contesxt.switchToHttp().getRequest();
    return request.currentUser;
  },
);
