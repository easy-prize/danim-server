import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [MongoModule],
  providers: [UserService],
})
export class UserModule {
}
