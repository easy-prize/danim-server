import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  exports: [ActivityService],
  imports: [MongoModule],
  providers: [ActivityService],
})
export class ActivityModule {
}
