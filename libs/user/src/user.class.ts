import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBase64, IsBoolean, IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { IUser } from './user.interface';

export class User implements IUser {
  @ApiProperty({
    example: 'user',
  })
  @IsString()
  public username: string;
  @ApiProperty({
    example: 'P@ssw0rd',
  })
  @Exclude()
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
