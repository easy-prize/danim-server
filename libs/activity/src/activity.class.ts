import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IActivity } from './activity.interface';

export class Activity implements IActivity {
  @IsString()
  @ApiProperty()
  public agency: string;
  public author: ObjectId;
  @IsString()
  @ApiProperty()
  public description: string;
  @IsString()
  @ApiProperty()
  public image: string;
  public links: ObjectId[];
  public review: ObjectId[];
  @IsString()
  @ApiProperty()
  public title: string;

  constructor(activity: IActivity) {
    Object.assign(activity);
  }
}
