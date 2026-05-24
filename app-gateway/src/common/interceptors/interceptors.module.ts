import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { RpcToHttpInterceptor } from './rpc-to-http.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcToHttpInterceptor,
    },
  ],
})
export class InterceptorsModule {}
