import { ObjectId } from 'mongodb';
import { IActivity } from './activity.interface';

export class ActivityInfo implements IActivity {
  public activity: string;
  public description: string;
  public agency: string;
  public author: ObjectId;
  public image: string;
  public review: ObjectId[];
  public title: string;

  constructor(activity: ActivityInfo) {
    Object.assign(activity);
  }
}
