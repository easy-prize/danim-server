import { ActivityModule } from '@app/activity';
import { CourseModule } from '@app/course';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, ActivityModule, CourseModule],
})
export class AppModule {
}
