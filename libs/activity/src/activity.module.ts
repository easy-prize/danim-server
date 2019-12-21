import { MongoModule } from '@app/mongo';
import { UserModule } from '@app/user';
import { HttpModule, Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  exports: [ActivityService],
  imports: [MongoModule, HttpModule, UserModule],
  providers: [ActivityService],
})
export class ActivityModule {
}
