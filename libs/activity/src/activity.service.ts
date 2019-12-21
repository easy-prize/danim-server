import { MongoService } from '@app/mongo';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import * as Cheerio from 'cheerio';
import { validateOrReject } from 'class-validator';

import { Collection, FilterQuery } from 'mongodb';
import { IActivityInfo } from './activity-info.interface';

import { Activity } from './activity.class';
import { IActivity } from './activity.interface';

@Injectable()
export class ActivityService {
  private readonly activityCollection: Collection<IActivity>;
  private readonly activityInfoCollection: Collection<IActivityInfo>;

  @Inject()
  private readonly httpService: HttpService;

  constructor(mongo: MongoService) {
    this.activityCollection = mongo.db().collection('activities');
    this.activityInfoCollection = mongo.db().collection('activityInfo');
  }

  public async create(activity: Activity): Promise<void> {
    await validateOrReject(activity);
    await this.activityCollection.insertOne(activity);
  }

  public async getActivity(query: FilterQuery<Activity>, isAutocomplete?: boolean): Promise<Activity[]> {
    return this.activityCollection.find(query).map((i) => new Activity(i)).toArray();
  }

  public async cacheRelatedLinkInfo(activity: Activity) {
    const items: IActivityInfo[] = [];
    const { status, data } = await this.httpService.get(`https://search.naver.com/search.naver?where=post&sm=tab_jum&query=${encodeURI(activity.title)}`).toPromise();

    if (status !== 200) {
      return items;
    }

    const $ = Cheerio.load(data);
    for (let i = 1; i <= 3; i++) {
      const blog = $(`#sp_blog_${i}`);

      const info: IActivityInfo = {
        author: blog.find('dl > dd.txt_block > span > a:nth-child(1)').text(),
        description: blog.find('dl > dd.sh_blog_passage.sh_blog_passage').text(),
        title: blog.find('dl > dt > a').attr('title'),
        url: blog.find('dl > dd.txt_block > span > a.url').attr('href'),
      };

      items.push(info);
    }

    const { title, author } = activity;
    const ids = (await this.activityInfoCollection.insertMany(items)).insertedIds;
    await this.activityCollection.updateOne({ title, author },
      { $set: { links: Object.values(ids) } });
  }
}
