import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  @Inject()
  private courseService;
}
