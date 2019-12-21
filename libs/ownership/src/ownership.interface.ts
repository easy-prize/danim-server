import { ObjectId } from 'mongodb';

export interface IOwnership {
  ownerPhoneNumber: string;
  course: ObjectId;
  isUsed: boolean;
}
