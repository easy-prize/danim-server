import { ActivityService } from '@app/activity';
import { MongoService } from '@app/mongo';
import { UserService } from '@app/user';
import { Inject, Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { Course } from './course.class';
import { ICourse } from './course.interface';

@Injectable()
export class CourseService {
  @Inject()
  private userService: UserService;
  @Inject()
  private activityService: ActivityService;
  private courseCollection: Collection<ICourse>;

  constructor(mongo: MongoService) {
    this.courseCollection = mongo.db().collection('courses');
  }

  public async addCourse(course: Course): Promise<void> {
    await this.courseCollection.insertOne(course);
  }

  public async addActivityToCourse(courseId: ObjectId, activityId: ObjectId, index?: number) {
    await this.courseCollection.updateOne({
      _id: courseId,
    }, {
      $push: {
        activities: {
          $each: [activityId],
          ...index && {
            $position: index,
          },
        },
      },
    });
  }

  public async removeActivitiesInCourse(courseId: ObjectId, activityIds: ObjectId[]) {
    await this.courseCollection.updateOne({
      _id: courseId,
    }, {
      $pullAll: {
        activities: activityIds,
      },
    });
  }
}
