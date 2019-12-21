import { Inject, Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { IReview } from './review.interface';

@Injectable()
export class ReviewService {
  @Inject()
  private reviewCollection: Collection<IReview>;

  public async addReview(review: IReview): Promise<ObjectId> {
    return (await this.reviewCollection.insertOne(review)).insertedId;
  }
}
