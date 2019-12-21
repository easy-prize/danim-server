import { ObjectId } from 'mongodb';
import { ICourse } from './course.interface';

export class Course implements ICourse {
  public author: ObjectId;
  public body: string;
  public isPublished: string;
  public review: ObjectId[];
  public thumbnail: string;
  public title: string;
  public activities: ObjectId[];
}
