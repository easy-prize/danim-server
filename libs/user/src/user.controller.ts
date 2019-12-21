import { Controller, Get, Inject, Param } from '@nestjs/common';
import { User } from './user.class';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject()
  private userService: UserService;

  @Get('search/:username')
  public searchUser(@Param('username') username: string): Promise<User[]> {
    return this.userService.getUser({
      username: {
        $regex: `^${username}`,
      },
    }, true);
  }

  @Get(':username')
  public async getUserByUsername(@Param('username') username: string): Promise<User> {
    return (await this.userService.getUser({
      username: {
        $eq: username,
      },
    }, false))[0];
  }
}
