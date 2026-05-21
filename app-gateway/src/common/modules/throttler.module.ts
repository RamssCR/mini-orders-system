import { THROTTLER_LIMIT, THROTTLER_TTL } from '#config/environment';
import { Module } from '@nestjs/common';
import { ThrottlerModule as ThrottlerModuleLib } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModuleLib.forRoot({
      throttlers: [
        {
          ttl: THROTTLER_TTL,
          limit: THROTTLER_LIMIT,
        },
      ],
    }),
  ],
})
export class ThrottlerModule {}
