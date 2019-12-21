import { MongoModule } from '@app/mongo';
import { HttpModule, Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  exports: [ActivityService],
  imports: [MongoModule, HttpModule],
  providers: [ActivityService],
})
export class ActivityModule {
}
