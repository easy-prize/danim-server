import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsBase64, IsBoolean, IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IUser } from './user.interface';

export class User implements IUser {
  @Exclude()
  // tslint:disable-next-line:variable-name
  public _id?: ObjectId;

  @Expose()
  @Transform((i: ObjectId) => i.toHexString())
  public get id(): ObjectId {
    return this._id;
  }

  @ApiProperty({
    example: 'user',
  })
  @IsString()
  public username: string;
  @ApiProperty({
    example: 'P@ssw0rd',
  })
  @IsString()
  public password: string;
  @ApiProperty({
    example: 'fullName',
  })
  @IsString()
  public fullName: string;
  @ApiProperty({
    example: '01030256290',
  })
  @IsNumberString()
  public phone: string;
  @ApiProperty({
    example: 'admin@test.com',
  })
  @IsEmail()
  public email: string;
  @ApiProperty({
    example: 'YXNkZg==',
  })
  @IsBase64()
  public profilePicture: string;
  @IsOptional()
  @IsBoolean()
  public isGuide?: boolean;

  constructor(user: IUser) {
    Object.assign(this, user);
  }
}
