import { ObjectId } from 'mongodb';

export interface IActivity {
  title: string;
  agency: string;
  description: string;
  review: ObjectId[];
  image: string;
}
