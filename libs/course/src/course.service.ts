import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { Collection, FilterQuery, ObjectId } from 'mongodb';
import { Course } from './course.class';
import { ICourse } from './course.interface';

@Injectable()
export class CourseService {
  private courseCollection: Collection<ICourse>;

  constructor(mongo: MongoService) {
    this.courseCollection = mongo.db().collection('courses');
  }

  public async getCourses(query: FilterQuery<ICourse>): Promise<Course[]> {
    return this.courseCollection.find(query).map((i) => new Course(i)).toArray();
  }

  public async addCourse(course: Course): Promise<ObjectId> {
    return (await this.courseCollection.insertOne(course)).insertedId;
  }

  public async addActivityToCourse(courseId: ObjectId, activityId: ObjectId[], index?: number) {
    await this.courseCollection.updateOne({
      _id: courseId,
    }, {
      $push: {
        activities: {
          $each: activityId,
          ...index && {
            $position: index,
          },
        },
      },
    });
  }

  public async patchActivitiesInCourse(courseId: ObjectId, activityIds: ObjectId[]) {
    await this.courseCollection.updateOne({
      _id: courseId,
    }, {
      $set: {
        activities: activityIds,
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
