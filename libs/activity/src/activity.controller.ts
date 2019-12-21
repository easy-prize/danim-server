import { Controller, Inject } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  @Inject()
  private activityService: ActivityService;
}
