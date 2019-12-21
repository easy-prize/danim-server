import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ICourse } from './course.interface';

export class Course implements ICourse {
  @ApiProperty()
  @IsString()
  public body: string;

  public author: ObjectId;
  public review: ObjectId[] = [];
  public isPublished: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBase64()
  public thumbnail: string;
  @ApiProperty()
  @IsString()
  public title: string;
  public activities: ObjectId[] = [];

  constructor(course: ICourse) {
    Object.assign(this, course);
  }
}
