import { ObjectId } from 'mongodb';
import { IActivity } from './activity.interface';

export class Activity implements IActivity {
  public agency: string;
  public author: ObjectId;
  public description: string;
  public image: string;
  public review: ObjectId[];
  public title: string;

  constructor(activity: IActivity) {
    Object.assign(activity);
  }
}
