import { ObjectId } from 'mongodb';

export interface ICourse {
  title: string;
  isPublished: string;
  author: ObjectId;
  body: string;
  review: ObjectId[];
  thumbnail: string;
}
