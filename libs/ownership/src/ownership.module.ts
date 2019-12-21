import { CourseModule } from '@app/course';
import { MongoModule } from '@app/mongo';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { OwnershipController } from './ownership.controller';
import { OwnershipService } from './ownership.service';

@Module({
  controllers: [OwnershipController],
  exports: [OwnershipService],
  imports: [MongoModule, CourseModule, UserModule],
  providers: [OwnershipService],
})
export class OwnershipModule {
}
