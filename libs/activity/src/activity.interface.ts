import { IActivityInfo } from './activity-info.interface';
import { ObjectId } from 'mongodb';

export interface IActivity {
  title: string;
  agency: string;
  description: string;
  review: ObjectId[];
  image: string;
  links: ObjectId[];
  author: ObjectId;
}
