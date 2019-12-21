import { ObjectId } from 'mongodb';
import { IReview } from './review.interface';

export class Review implements IReview {
  public author: ObjectId;
  public body: string;
  public title: string;
}
