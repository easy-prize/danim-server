import { UserService } from '@app/user';
import { Body, ClassSerializerInterceptor, Controller, Get, Headers, Inject, Param, Put, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
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

  @Get()
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  public async getMyActivities(@Headers() { authorization: token }) {
    const userId = this.userService.verify((token as string).split(' ')[1]).idx;
    return this.activityService.getActivity({
      author: userId,
    });
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  public async getActivityById(@Param('id') id: string) {
    return this.activityService.getActivity({
      _id: {
        $eq: ObjectId.createFromHexString(id),
      },
    });
  }

  @Get('search/:name')
  @UseInterceptors(ClassSerializerInterceptor)
  public async getActivityAutocomplete(@Param('name') name: string) {
    return this.activityService.getActivity({
      title: {
        $regex: name,
      },
    }, true);
  }
}
