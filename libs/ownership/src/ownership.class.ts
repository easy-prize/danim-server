import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { IOwnership } from './ownership.interface';

export class Ownership implements IOwnership {
  @Transform((i: ObjectId) => i.toHexString())
  public course: ObjectId;
  public isUsed: boolean;
  public ownerPhoneNumber: string;

  constructor(ownership: IOwnership) {
    Object.assign(this, ownership);
  }
}
