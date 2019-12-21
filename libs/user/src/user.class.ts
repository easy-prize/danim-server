import { IsBase64, IsBoolean, IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { IUser } from './user.interface';

export class User implements IUser {
  @IsString()
  public username: string;
  @IsString()
  public password: string;
  @IsString()
  public fullName: string;
  @IsNumberString()
  public phone: string;
  @IsEmail()
  public email: string;
  @IsBase64()
  public profilePicture: string;
  @IsOptional()
  @IsBoolean()
  public isGuide?: boolean;

  constructor(user: IUser) {
    Object.assign(this, user);
  }
}
