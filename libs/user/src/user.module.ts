import { ConfigModule, ConfigService } from '@app/config';
import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [MongoModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory(configService: ConfigService) {
      return {
        secret: configService.JWT_SECRET,
      };
    },
  })],
  providers: [UserService],
})
export class UserModule {
}
