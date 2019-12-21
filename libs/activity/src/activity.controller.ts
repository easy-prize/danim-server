import { UserService } from '@app/user';
import { Body, Controller, Headers, Inject, Put, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  public async addActivity(@Body(new ValidationPipe()) activity: Activity, @Headers('Authorization') token: string): Promise<void> {
    const userId = this.userService.verify(token).idx;
    await this.activityService.create({
      ...activity,
      author: userId,
    });
  }
}
