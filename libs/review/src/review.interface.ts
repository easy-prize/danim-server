import { ObjectId } from 'mongodb';

export interface IReview {
  title: string;
  author: ObjectId;
  body: string;
}
