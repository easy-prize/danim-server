import { CourseService } from '@app/course';
import { MongoService } from '@app/mongo';
import { UserService } from '@app/user';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Collection, FilterQuery, ObjectId } from 'mongodb';
import { Ownership } from './ownership.class';
import { IOwnership } from './ownership.interface';

@Injectable()
export class OwnershipService {
  @Inject()
  private courseService: CourseService;
  @Inject()
  private userService: UserService;
  private readonly ownershipCollection: Collection<IOwnership>;

  constructor(mongo: MongoService) {
    this.ownershipCollection = mongo.db().collection('ownerships');
  }

  public getOwnership(query: FilterQuery<IOwnership>): Promise<Ownership[]> {
    return this.ownershipCollection.find(query).map((i) => new Ownership(i)).toArray();
  }

  public async addOwnershipToCourse(user: ObjectId, course: ObjectId): Promise<ObjectId> {
    if ((await this.courseService.getCourses({
      _id: course,
    })).length !== 1) {
      throw new NotFoundException();
    }
    return (await this.ownershipCollection.insertOne({
      course,
      isUsed: false,
      ownerPhoneNumber: (await this.userService.getUser({
        _id: user,
      }, false))[0].phone,
    })).insertedId;
  }

  public async useTicket(ownership: ObjectId) {
    await this.ownershipCollection.updateOne({
      _id: ownership,
    }, {
      $set: {
        isUsed: true,
      },
    });
  }

  public async transfer(ownership: ObjectId, to: string) {
    await this.ownershipCollection.updateOne({
      _id: {
        $eq: ownership,
      },
    }, {
      $set: {
        ownerPhoneNumber: to,
      },
    });
  }
}
