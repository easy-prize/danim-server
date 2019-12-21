import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IActivity } from './activity.interface';

export class Activity implements IActivity {
  @Transform((i: ObjectId) => i.toHexString())
  public author: ObjectId;
  @Transform((i: ObjectId[]) => i.map((j) => j.toHexString()))
  public links: ObjectId[];

  @IsString()
  @ApiProperty()
  public agency: string;
  @Transform((i: ObjectId[]) => i.map((j) => j.toHexString()))
  public review: ObjectId[];
  @IsString()
  @ApiProperty()
  public description: string;
  @IsString()
  @ApiProperty()
  public image: string;

  @Exclude()
  // tslint:disable-next-line:variable-name
  public _id?: ObjectId;

  @Expose()
  @Transform((i: ObjectId) => i.toHexString())
  public get id(): ObjectId {
    return this._id;
  }

  @IsString()
  @ApiProperty()
  public title: string;

  constructor(activity: IActivity) {
    Object.assign(this, activity);
  }
}
