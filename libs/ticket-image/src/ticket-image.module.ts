import { Module } from '@nestjs/common';
import { TicketImageService } from './ticket-image.service';

@Module({
  providers: [TicketImageService],
  exports: [TicketImageService],
})
export class TicketImageModule {}
