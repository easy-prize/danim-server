import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  public token: string;
}
