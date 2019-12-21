import { Test, TestingModule } from '@nestjs/testing';

import { Activity } from './activity.class';
import { ActivityModule } from './activity.module';
import { ActivityService } from './activity.service';

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ActivityModule],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('Crawling', async () => {
    const activity: Activity = {
      title: '코타키나발루',
      agency: '다날 귀욤쨩',
      description: '귀여운 여행지',
      review: [],
      image: '',
      author: null,
    };
    
    console.log(JSON.stringify(await service.cacheRelatedLinkInfo(activity)));
  });
});