import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class ModifyActivityDto {
  @ValidateNested()
  @IsString()
  @Type(() => String)
  @ApiProperty({
    description: 'ObjectIds',
    isArray: true,
    type: String,
  })
  public activities: string[];
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  public index?: number;
}
