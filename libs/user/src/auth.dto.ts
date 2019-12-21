import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({
    example: 'user',
  })
  public username: string;
  @IsString()
  @ApiProperty({
    example: 'P@ssw0rd',
  })
  public password: string;
}
