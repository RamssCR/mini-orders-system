import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditsModule } from './audits/audits.module';
import { DatabaseModule } from '#common/modules/database.module';
import { Module } from '@nestjs/common';
import { PipesModule } from '#common/pipes/pipes.module';

@Module({
  imports: [AuditsModule, DatabaseModule, PipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
