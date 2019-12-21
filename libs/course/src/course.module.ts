import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';

@Module({
  exports: [CourseService],
  imports: [MongoModule],
  providers: [CourseService],
})
export class CourseModule {
}
