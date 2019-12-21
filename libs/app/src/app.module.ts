import { ActivityModule } from '@app/activity';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, ActivityModule],
})
export class AppModule {
}
