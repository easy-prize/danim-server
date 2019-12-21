import { UserService } from '@app/user';
import { Body, Controller, Headers, Inject, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Activity } from './activity.class';
import { ActivityService } from './activity.service';

@Controller('activity')
@ApiTags('Activity')
export class ActivityController {
  @Inject()
  private activityService: ActivityService;
  @Inject()
  private userService: UserService;

  @Put()
  @ApiBearerAuth()
  public async addActivity(@Body(new ValidationPipe()) activity: Activity, @Headers() { authorization: token }): Promise<void> {
    const userId = this.userService.verify((token as string).split(' ')[1]).idx;
    await this.activityService.create(new Activity({
      ...activity,
      author: userId,
    }));
  }
}
