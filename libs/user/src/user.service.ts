import { MongoService } from '@app/mongo';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Collection, FilterQuery } from 'mongodb';
import { AuthDto } from './auth.dto';
import { User } from './user.class';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  private readonly userCollection: Collection<IUser>;

  constructor(mongo: MongoService, private readonly jwtService: JwtService) {
    this.userCollection = mongo.db().collection('users');
  }

  public async create(user: User): Promise<void> {
    await this.userCollection.insertOne(user);
  }

  public async getUser(query: FilterQuery<User>, isAutocomplete: boolean): Promise<User[]> {
    return this.userCollection.find(query).map((i) => new User(i)).toArray();
  }

  public async auth({ username, password }: AuthDto): Promise<string> {
    const user = await this.userCollection.find({
      username: {
        $eq: username,
      },
    }).next();
    if (!user || user.password !== password) {
      throw new BadRequestException();
    }
    return this.sign(user);
  }

  private sign(user: User) {
    return this.jwtService.sign({
      id: user.username,
    });
  }

  private verify(token): string {
    return this.jwtService.verify<{
      id: string,
    }>(token).id;
  }
}
