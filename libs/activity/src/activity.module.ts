import { MongoModule } from '@app/mongo';
import { HttpService, Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  exports: [ActivityService],
  imports: [MongoModule],
  providers: [ActivityService, HttpService],
})
export class ActivityModule {
}
