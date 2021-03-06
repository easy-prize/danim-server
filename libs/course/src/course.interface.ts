import { ObjectId } from 'mongodb';

export interface ICourse {
  title: string;
  activities: ObjectId[];
  isPublished: string;
  author: ObjectId;
  body: string;
  review: ObjectId[];
  thumbnail: string;
}
