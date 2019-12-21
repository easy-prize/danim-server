import { UserService } from '@app/user';
import { ClassSerializerInterceptor, Controller, Get, Headers, Inject, Param, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { OwnershipService } from './ownership.service';

@Controller('ownership')
@ApiTags('Ownership')
export class OwnershipController {
  @Inject()
  private ownershipService: OwnershipService;
  @Inject()
  private userService: UserService;

  @Get()
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  public async getMyTickets(@Headers('authorization') token: string) {
    return this.ownershipService.getOwnership({
      ownerPhoneNumber: (await this.userService.getUser({
        _id: this.userService.verify(token).idx,
      }, false))[0].phone,
    });
  }

  @Put('new/:id')
  @ApiBearerAuth()
  public async createMyTickets(@Param('id') course: string, @Headers('authorization') token: string) {
    await this.ownershipService.addOwnershipToCourse(this.userService.verify(token).idx, ObjectId.createFromHexString(course));
  }

  @Put(':id/use')
  @ApiBearerAuth()
  public async useTicket(@Param('id') ticketId: string, @Headers('authorization') token: string) {
    await this.ownershipService.useTicket(ObjectId.createFromHexString(ticketId));
  }
}
