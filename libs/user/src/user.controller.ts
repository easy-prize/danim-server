import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthResponse } from './auth.response';
import { User } from './user.class';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  @Inject()
  private userService: UserService;

  @Post('auth')
  @ApiOkResponse({
    type: AuthDto,
  })
  public async auth(@Body(new ValidationPipe()) auth: AuthDto): Promise<AuthResponse> {
    return {
      token: await this.userService.auth(auth),
    };
  }

  @Put()
  public async createUser(@Body(new ValidationPipe()) user: User): Promise<void> {
    await this.userService.create(user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    type: User,
  })
  @ApiBearerAuth()
  public async getMyInfo(@Headers() { authorization: token }): Promise<User> {
    return (await this.userService.getUser({
      _id: {
        $eq: this.userService.verify((token as string).split(' ')[1]).idx,
      },
    }, false))[0];
  }

  @Get('search/:username')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    isArray: true,
    type: User,
  })
  public searchUser(@Param('username') username: string): Promise<User[]> {
    return this.userService.getUser({
      username: {
        $regex: `^${username}`,
      },
    }, true);
  }

  @Get(':username')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({
    isArray: true,
    type: User,
  })
  public async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = (await this.userService.getUser({
      username: {
        $eq: username,
      },
    }, false))[0];
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
