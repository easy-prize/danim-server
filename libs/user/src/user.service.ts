import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Collection, FilterQuery } from 'mongodb';
import { User } from './user.class';

@Injectable()
export class UserService {
  private readonly userCollection: Collection<User>;

  constructor(mongo: MongoService) {
    this.userCollection = mongo.db().collection('users');
  }

  public async create(user: User): Promise<void> {
    await validateOrReject(user);
    await this.userCollection.insertOne(user);
  }

  public async getUser(query: FilterQuery<User>, isAutocomplete: boolean): Promise<User[]> {
    return this.userCollection.find(query).map((i) => new User(i)).toArray();
  }
}
