import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Collection, ObjectId } from 'mongodb';
import { Activity } from './activity.class';
import { IActivity } from './activity.interface';

@Injectable()
export class ActivityService {
  private activityCollection: Collection<IActivity>;

  constructor(mongo: MongoService) {
    this.activityCollection = mongo.db().collection('activities');
  }

  public async create(activity: Activity): Promise<void> {
    await validateOrReject(activity);
    await this.activityCollection.insertOne(activity);
  }

  public async getActivity(ids: ObjectId[]): Promise<Activity[]> {
    return this.activityCollection.find({
      _id: {
        $in: ids,
      },
    }).map((i) => new Activity(i)).toArray();
  }
}
