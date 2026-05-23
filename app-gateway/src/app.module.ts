import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PipesModule } from '#common/pipes/pipes.module';
import { ThrottlerModule } from '#common/modules/throttler.module';

@Module({
  imports: [PipesModule, ThrottlerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
