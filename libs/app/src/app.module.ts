import { ActivityModule } from '@app/activity';
import { CourseModule } from '@app/course';
import { OwnershipModule } from '@app/ownership';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, ActivityModule, CourseModule, OwnershipModule],
})
export class AppModule {
}
