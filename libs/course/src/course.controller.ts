import { UserService } from '@app/user';
import { Body, Controller, Delete, ForbiddenException, Get, Headers, Inject, Param, Patch, Put, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Course } from './course.class';
import { CourseService } from './course.service';
import { ModifyActivityDto } from './modify-activity.dto';

@Controller('course')
@ApiTags('Course')
export class CourseController {
  @Inject()
  private readonly courseService: CourseService;
  @Inject()
  private readonly userService: UserService;

  @Get()
  @ApiBearerAuth()
  public getMyCourses(@Headers() { authorization: token }) {
    return this.courseService.getCourses({
      author: this.userService.verify(token).idx,
    });
  }

  @Put()
  @ApiBearerAuth()
  public async addCourse(@Body(new ValidationPipe()) course: Course, @Headers() { authorization: token }) {
    return {
      insertedId: await this.courseService.addCourse({
        ...course,
        author: this.userService.verify(token).idx,
      }),
    };
  }

  @Get('search/:query')
  public async searchCourse(@Param('query') query: string) {
    return this.courseService.getCourses({
      title: {
        $regex: query,
      },
    });
  }

  @Get(':course')
  public async getCourse(@Param('course') course: string) {
    return this.courseService.getCourses({
      _id: ObjectId.createFromHexString(course),
    });
  }

  @Put(':course')
  @ApiBearerAuth()
  public async addActivity(
    @Param('course') course: string,
    @Body(new ValidationPipe()) { activities, index }: ModifyActivityDto,
    @Headers() { authorization: token },
  ) {
    await this.checkOwnerOrReject(this.userService.verify(token).idx, ObjectId.createFromHexString(course));
    await this.courseService.addActivityToCourse(ObjectId.createFromHexString(course), activities.map((i) => ObjectId.createFromHexString(i)), index);
  }

  @Patch(':course')
  @ApiBearerAuth()
  public async patchActivity(
    @Param('course') course: string,
    @Body(new ValidationPipe()) { activities }: ModifyActivityDto,
    @Headers() { authorization: token },
  ) {
    await this.checkOwnerOrReject(this.userService.verify(token).idx, ObjectId.createFromHexString(course));
    await this.courseService.patchActivitiesInCourse(ObjectId.createFromHexString(course), activities.map((i) => ObjectId.createFromHexString(i)));
  }

  @Delete(':course')
  @ApiBearerAuth()
  public async deleteActivity(
    @Param('course') course: string,
    @Body(new ValidationPipe()) { activities }: ModifyActivityDto,
    @Headers() { authorization: token },
  ) {
    await this.checkOwnerOrReject(this.userService.verify(token).idx, ObjectId.createFromHexString(course));
    await this.courseService.removeActivitiesInCourse(ObjectId.createFromHexString(course), activities.map((i) => ObjectId.createFromHexString(i)));
  }

  private async checkOwnerOrReject(user: ObjectId, course: ObjectId) {
    if (!(await this.courseService.getCourses({
      _id: {
        $eq: course,
      },
    }))[0].author.equals(user)) {
      throw new ForbiddenException();
    }
  }
}
