import { ConfigService } from '@app/config';
import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService extends MongoClient {
  constructor(config: ConfigService) {
    super(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect(): Promise<this> {
    await super.connect();
    return this;
  }
}
