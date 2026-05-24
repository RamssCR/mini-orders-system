import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          exceptionFactory: (errors) => {
            const formatted = `${errors[0].property} - ${Object.values(errors[0].constraints ?? {}).join(', ')}`;
            return new RpcException({
              message: formatted,
              status: 400,
              isRpc: true,
            });
          },
        }),
    },
  ],
})
export class PipesModule {}
