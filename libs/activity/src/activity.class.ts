import { IActivity } from './activity.interface';
import { ObjectId } from 'mongodb';

export class Activity implements IActivity {
  public agency: string;
  public author: ObjectId;
  public description: string;
  public image: string;
  public links: ObjectId[];
  public review: ObjectId[];
  public title: string;

  constructor(activity: IActivity) {
    Object.assign(activity);
  }
}
