import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '#common/modules/throttler.module';

@Module({
  imports: [ThrottlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
