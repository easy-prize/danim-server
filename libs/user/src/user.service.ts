import { MongoService } from '@app/mongo';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Collection, FilterQuery, ObjectId } from 'mongodb';
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
    if (await this.userCollection.find({
      username: {
        $eq: user.username,
      },
    }).next()) {
      throw new ConflictException();
    }
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

  public verify(token): {
    id: string,
    idx: ObjectId,
  } {
    const data = this.jwtService.verify<{
      id: string,
      idx: string,
    }>(token);
    return {
      ...data,
      idx: ObjectId.createFromHexString(data.idx),
    };
  }

  private sign(user: User) {
    return this.jwtService.sign({
      id: user.username,
      idx: (user as User & {
        _id: ObjectId,
      })._id.toHexString(),
    });
  }
}
