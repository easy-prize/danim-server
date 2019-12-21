import { Injectable } from '@nestjs/common';
import { IsString, IsUrl, validateSync } from 'class-validator';
import { parse } from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
  @IsString()
  public readonly MONGODB_URI: string;
  @IsUrl()
  public readonly ES_NODE: string;
  @IsString()
  public readonly ES_USER: string;
  @IsString()
  public readonly ES_PASS: string;
  @IsUrl()
  public readonly ES_APM: string;
  @IsString()
  public readonly JWT_SECRET: string;

  constructor() {
    const filePath = resolve(process.cwd(), '.env');
    Object.assign(this, {
      ...process.env,
      ...existsSync(filePath) && parse(readFileSync(filePath)),
    });
    const error = validateSync(this);
    if (error.length > 0) {
      throw error[0];
    }
  }
}

export const config = new ConfigService();
