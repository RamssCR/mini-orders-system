import { APP_FILTER } from '@nestjs/core';
import { CustomRpcExceptionFilter } from './rcp-exception.filter';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomRpcExceptionFilter,
    },
  ],
})
export class ExceptionsFilterModule {}
