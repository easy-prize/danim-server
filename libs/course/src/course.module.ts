import { ActivityModule } from '@app/activity';
import { MongoModule } from '@app/mongo';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  exports: [CourseService],
  imports: [MongoModule, UserModule, ActivityModule],
  providers: [CourseService],
})
export class CourseModule {
}
