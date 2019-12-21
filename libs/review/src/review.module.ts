import { MongoModule } from '@app/mongo';
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';

@Module({
  exports: [ReviewService],
  imports: [MongoModule],
  providers: [ReviewService],
})
export class ReviewModule {
}
